////@ts-check
const logger = require('./utils/loggerWinston');
const generateFakeProducts = require('./utils/fakerProdGen.js');

const getRoute = (req, res) => {
    // const mainRoute = req.params;
    // console.log(mainRoute);
    logger.log('verbose', 'Me conecte a la landing');
    res.render('login', {});
};

const getLogin = (req, res) => {
    logger.log('info', 'Ingreso a Login');

    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render('profileUser', { user });
    } else {
        res.render('login', {});
    }
};

const getFailLogin = (req, res) => {
    logger.log('warn', 'Fallo el login');
    res.render('failLogin', {});
};

const getSignUp = (req, res) => {
    logger.log('verbose', 'Realizando el signUp');

    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render('profileUser', { user });
    } else {
        res.render('signup');
    }
};

const getFailSignUp = (req, res) => {
    logger.log('error', 'Fallo la creacion de un usuario');
    res.render('failSignUp', {});
};

const getLogout = (req, res) => {
    logger.log('verbose', 'Usuario sale');
    const { username } = req.user;
    logger.log('info', `Se desconecto el usuario ${username}`);
    req.session.destroy((err) => {
        if (err) {
            res.send('No se pudo deslogear');
        } else {
            res.render('logout', { user: username });
        }
    });
};

const fakeProducts = (req, res) => {
    console.log('entre al router');
    const productos = generateFakeProducts(5);
    // logger.log('info', `${JSON.stringify(productos)}`);
    res.render('fakeProducts', { productos });
};

const failRoute = (req, res) => {
    logger.log('error', 'Ruta incorrecta');
    res.status(404).render('failRoute', {});
};

const postLogin = (req, res) => {
    logger.log('verbose', 'Logueado con exito');
    const { username, password } = req.user;
    const user = { username, password };
    res.render('profileUser', { user });
};

const postSignUp = (req, res) => {
    logger.log('verbose', 'usuario creado con exito');
    const { username, password } = req.user;
    const user = { username, password };
    res.render('successSignUp', { user });
};

const getInfo = (req, res) => {
    // console.log('Prueba peso');
    logger.log('info', 'hola, estoy entrando a info');
    res.render('info', {});
    logger.log('info', 'Entre a info');
    // res.send(`
    // Argumentos de entrada: ${process.argv.slice(2)} <br>
    // Nombre de la plataforma: ${process.platform} <br>
    // Versión de node.js: ${process.version} <br>
    // Memoria total reservada: ${process.memoryUsage.rss()} <br>
    // Path de ejecución: ${process.cwd()} <br>
    // Process id: ${process.pid} <br>
    // Carpeta del proyecto: ${process.argv} <br>
    // `);
};

module.exports = {
    getRoute,
    getLogin,
    getFailLogin,
    getSignUp,
    getFailSignUp,
    getLogout,
    failRoute,
    postLogin,
    postSignUp,
    fakeProducts,
    getInfo,
};
