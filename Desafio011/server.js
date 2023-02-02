const express = require('express');
const app = express();
const PORT = 8080;
// Implementacion del server con socket
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const { engine } = require('express-handlebars');
const { normalize, schema, denormalize } = require('normalizr');
const Contenedor = require('./container/contenedor');
const ContenedorMsg = require('./container/contenedorMsg');
const session = require('express-session');
//Passport y lo necesario para el login.
const router = require('./routes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'piponeta';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uri =
    'mongodb+srv://jmaragonpaz:Fbip5wY6oXv0KucT@cluster0.tdhhm4p.mongodb.net/passport?retryWrites=true&w=majority';
/////////////////////////////////////////////////////

/* Generar productos fake */
const generateFakeProducts = require('./utils/fakerProductGenerator');
const FakeP = generateFakeProducts(5);

const moment = require('moment');
const MongoStore = require('connect-mongo');
const timestamp = moment().format('h:mm a');
const Productos = new Contenedor('productos');
const ProdFs = Productos.getAll();
const dataMsg = new ContenedorMsg();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT));

//Aca va lo de handelbars
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
        await mongoose.connect(uri, { useNewUrlParser: true });
        console.log('Conectado a mongo Atlas');
    } catch (error) {
        console.log(error);
        throw "Can't connect to DB";
    }
}
connectMG();

//Middleware
function auth(req, res, next) {
    if (req.session?.user === 'pipo' && req.session?.admin) {
        return next();
    } else {
        return res.status(401).send('error de autorización!');
    }
}
///////////////////////////////////////////////////////////////////
//Passport Configuration
function isValidPassport(user, password) {
    return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
    'login',
    new LocalStrategy((username, password, done) => {
        Users.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) {
                console.log(`Username: ${username}, not found`);
                return done(null, false);
            }
            if (!isValidPassport(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }
            return done(null, user);
        });
    })
);
passport.use(
    'singup',
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        Users.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log(`Error: ${err}, in singup`);
                return done(err);
            }
            if (user) {
                console.log(`User ${username} already exists`);
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: createHash(password),
            };
            Users.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log(`Error: ${err}, in saving user`);
                    return done(err);
                }
                console.log(`User: ${user}, registration successful`);
                return done(null, userWithId);
            });
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    Users.findById(id, done);
});

//Manejo de la sesion con mongo
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 60,
        }),
        secret: 'secretKey',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
    })
);

app.use(passport.initialize());
app.use(passport.session());
//Aca comienzan las rutas\
app.get('/', router);

app.get('/productos-list', async (req, res) => {
    res.render('productList');
});

/* Ruta que pide el desafío de normalizr */
app.get('/productos-test', async (req, res) => {
    res.render('productTest');
});

//Ruta del chat
app.get('/chat', (req, res) => {
    res.render('chat');
});

/* Normalizacion */

// 1. Definir esquemas

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('messages', {
    author: authorSchema,
});

const chatSchema = new schema.Entity('chats', {
    messages: [messageSchema],
});

// 2. Aplicar Normalizacion (funcion que normaliza datos)

const normalizarData = (data) => {
    const dataNormalizada = normalize({ id: 'chatHistory', messages: data }, chatSchema);
    return dataNormalizada;
};

// 3. Normaliza mensajes

const normalizarMensajes = async () => {
    const messages = await dataMsg.getAll();
    const normalizedMessages = normalizarData(messages);
    return normalizedMessages;
};

// Corre cuando se conecta un cleinte
io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    // Muestra la lista completa de productos random
    socket.emit('productos-test', FakeP);
    // Muestra la lista de productos del Fs al admin
    socket.emit('productos-list', await ProdFs);
    // Muestra el historial completo de chats
    socket.emit('msg-list', await normalizarMensajes());

    // Recibe prodcuto del cliente
    socket.on('product', async (data) => {
        // Guarda el producto nuevo en productos.json
        await Productos.save(data);

        // Muestra el mensaje por consola
        console.log('Se recibio un producto nuevo', 'producto:', data);

        // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
        io.emit('productos-list', await ProdFs);
    });

    // Recibe mensaje del cliente
    socket.on('msg', async (data) => {
        // Guarda en mensaje nuevo en mensajes.json
        await dataMsg.save({ ...data, timestamp: timestamp });

        // Muestra el mensaje por consola
        console.log('Se recibio un msg nuevo', 'msg:', data);

        // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
        io.sockets.emit('msg-list', await normalizarMensajes());
    });
});
//PARTE DE LOGUEO
//Persistencia en mongo
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://jmaragonpaz:Fbip5wY6oXv0KucT@cluster0.tdhhm4p.mongodb.net/',
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        }),
        cookie: { maxAge: 60 * 10000 },
        rolling: true,
        secret: 'secreto',
        resave: false,
        saveUninitialized: true,
    })
);
//LOGIN
//1ro pongo un get para atajar la ruta:
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    //console.log(body);
    if (username !== 'pipo' || password !== 'pipopass') {
        return res.send('login failed');
    }
    //Crea user y le pone la flag que es administrador
    req.session.user = username;
    req.session.admin = true;
    //res.send('login success!');
    res.render('logged', { username: req.session.user });
});

//LOGOUT
app.get('/logout', (req, res) => {
    const userInfo = [];
    if (userInfo.length === 0) {
        userInfo.push(req.session.user);
    }
    req.session.destroy((err) => {
        if (err) {
            res.send('no pudo desloguear');
        } else {
            console.log('borramamos todo. Deslogueado');
            res.render('logout', { layout: 'index', username: userInfo });
        }
    });
});

//Ruta confidencial
app.get('/privado', auth, (req, res) => {
    //res.send('si estas viendo esto es porque ya te logueaste!, sos pipo y sos admin');
    res.render('privado');
});
//Showsession
app.use('/showsession', (req, res) => {
    res.json(req.session);
});
