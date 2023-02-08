//@ts-check
const getRoute = (req, res) => {
    res.render('login', {});
};

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render('profileUser', { user });
    } else {
        res.render('login', {});
    }
};

const getFailLogin = (req, res) => {
    res.render('failLogin', {});
};

const getSignUp = (req, res) => {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render('profileUser', { user });
    } else {
        res.render('signup');
    }
};

const getFailSignUp = (req, res) => {
    res.render('failSignUp', {});
};

const getLogout = (req, res) => {
    const { username } = req.user;
    console.log(username);
    req.session.destroy((err) => {
        if (err) {
            res.send('No se pudo deslogear');
        } else {
            res.render('logout', { user: username });
        }
    });
};

const productsTest = (req, res) => {
    res.render('fakeProducts', {});
};

const failRoute = (req, res) => {
    res.status(404).render('routing-error', {});
};

const postLogin = (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.render('profileUser', { user });
};

const postSignUp = (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.render('successSignUp', { user });
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
    productsTest,
};
