////@ts-check
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const MongoStore = require('connect-mongo');
const session = require('express-session');
const mongoose = require('mongoose');
const ProductoSchema = require('./models/modelProducts');
const compression = require('compression');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');
const bcrypt = require('bcrypt');
const routes = require('./routes');

const clusterMode = process.argv[3] == 'CLUSTER';
const logger = require('./utils/loggerWinston');
// Implementacion del server con socket
const generateFakeProducts = require('./utils/fakerProdGen.js');
const ProductosDaoMongoDB = require('./daos/productosDaoMongoDB');
const MensajesDaoMongoDB = require('./daos/mensajesDaoMongoDB');
const { MONGO } = require('./config');
const { normalize, schema, denormalize } = require('normalizr');
const config = require('./config.js');
const path = require('path');

//Passport y lo necesario para el login.
// const TwitterStrategy = require('passport-twitter').Strategy;

// const jwt = require('jsonwebtoken');
// const PRIVATE_KEY = 'piponeta';
const uri = 'mongodb+srv://jmaragonpaz:Fbip5wY6oXv0KucT@cluster0.tdhhm4p.mongodb.net/passport';
/////////////////////////////////////////////////////

/* Generar productos fake */
// const FakeP = generateFakeProducts(5);

//yargs
// const yargs = require('yargs/yargs')(process.argv.slice(2));
// const args = yargs.default({ PORT: 8080 }).alias({ p: 'PORT' }).argv;

//ChildProcess
const { fork } = require('child_process');
// const moment = require('moment');

// const timestamp = moment().format('h:mm a');
// const Productos = new Contenedor('productos');
// const ProdFs = Productos.getAll();
// const dataMsg = new ContenedorMsg();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use('/public', express.static(__dirname + '/public'));

// console.log(process.argv.slice(2));

// const productContainer = require('./classContainer/contenedor')
// const msgsContainer = require('./classContainer/contenedorMsgs')
// const containerProd= new productContainer({name:'products', schema: ProductoSchema})
// const containerMsgs=new msgsContainer('msgsTab')

if (process.env.MODE != 'production') {
    require('dotenv').config();
}

const PORT = parseInt(process.argv[2]) || 8080;
const MONGO_URL = process.env.MONGO;
logger.log('info', `Port: ${PORT}, ClusterMode: ${clusterMode}`);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.direct('/login');
    }
}

//Handelbars
const { engine } = require('express-handlebars');
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);

//Mongoose connection
async function connectMG() {
    try {
        await mongoose.connect(MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.log('info', 'Conectado a mongo Atlas');
    } catch (error) {
        logger.log('error', `Error connecting to Mongo: ${error.message}`);
        process.exit(1);
    }
}
connectMG();
//Manejo de la sesion con mongo
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: uri,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 60,
        }),
        secret: 'secretKey',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 }, //60 minutes
    })
);

//Middleware
// function auth(req, res, next) {
//     if (req.session?.user === 'pipo' && req.session?.admin) {
//         return next();
//     } else {
//         return res.status(401).send('error de autorización!');
//     }
// }

const products = new ProductosDaoMongoDB();
const msgs = new MensajesDaoMongoDB();
///////////////////////////////////////////////////////////////////
//Passport Configuration
function isValidPassport(user, password) {
    return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //Aca saque el null como tercer argumento porque chilla el ts-check
}

passport.use(
    'login',
    new LocalStrategy((username, password, done) => {
        Users.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) {
                logger.log('info', `Username: ${username}, not found`);
                return done(null, false);
            }
            if (!isValidPassport(user, password)) {
                logger.log('ino', 'Invalid Password');
                return done(null, false);
            }
            return done(null, user);
        });
    })
);
passport.use(
    'signup',
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        Users.findOne({ username: username }, (err, user) => {
            if (err) {
                logger.log('error', `Error: ${err}, in singup`);
                return done(err);
            }
            if (user) {
                logger.log('error', `User ${username} already exists`);
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: createHash(password),
            };
            Users.create(newUser, (err, userWithId) => {
                if (err) {
                    logger.log('error', `Error: ${err}, in saving user`);
                    return done(err);
                }
                logger.log('info', `User: ${user}, registration successful`);
                return done(null, userWithId);
            });
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    Users.findById(id, done);
});

app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////////////////////////////////
//////Rutas////////////////////////////
//Aca comienzan las rutas\
app.get('/', routes.getRoute);
app.get('/login', routes.getLogin);
app.get('/failLogin', routes.getFailLogin);
app.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/failLogin' }),
    routes.postLogin
);
//////////
//SIGNUP
app.get('/signup', routes.getSignUp);
app.get('/failSignUp', routes.getFailSignUp);
app.post(
    '/signup',
    passport.authenticate('signup', { failureRedirect: '/failSignUp' }),
    routes.postSignUp
);

app.get('/logout', routes.getLogout);

//Info route
app.get('/info', routes.getInfo);

//GET RANDOMS
app.get('/api/randoms', (req, res) => {
    let cantNum = req.query.cant;
    cant = parseInt(cantNum);

    let computo = fork('./childProcess.js');
    computo.send({ start: 'start', cantNum });

    computo.on('message', (msg) => {
        const { data } = msg;
        res.end(`la suma es ${data}`);
    });
});

/* Ruta que pide el desafío de normalizr */
app.get('/fakeProducts', routes.fakeProducts);

/////////////////////////////////////////
//1 Conecto al server
io.on('connection', async (socket) => {
    logger.log('info', `usuario conectado`);
    socket.emit('msgs', await msgs.getAll());
    const test = await products.getAll();
    socket.emit('products', test);
    const aux = await FakeP;
    socket.emit('fakeProducts', aux);
    //3 Aca agarramos el send que hace el front
    socket.on('newProd', async (data) => {
        await products.save(data);
        const updateList = await products.getAll();
        io.sockets.emit('products', updateList); // le mando a todos los sockets la lista updateada
    });

    socket.on('newMsg', async (data) => {
        await msgs.save(data);
        const msgsList = await msgs.getAll();
        io.sockets.emit('msgs', msgsList);
    });
});

//Ruta confidencial
// app.get('/privado', auth, (req, res) => {
//     //res.send('si estas viendo esto es porque ya te logueaste!, sos pipo y sos admin');
//     res.render('privado');
// });
//Showsession
app.use('/showsession', (req, res) => {
    res.json(req.session);
});

app.get('/productos-list', async (req, res) => {
    res.render('productList');
});

//Ruta del chat
app.get('/chat', (req, res) => {
    res.render('chat');
});

//FailRoute
app.get('*', routes.failRoute);

httpServer.listen(PORT, () => logger.log('info', 'SERVER ON http://localhost:' + PORT));
