const { User } = require('./../models/user');

const auth = (req, res, next) => {
    const token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({
                isAuth: false,
                error: true,
            });
        }

        req.token = token;
        req.user = user;
        next();
    });
};

// const authenticate = (req, res, next) => {
//     const token = req.header('x-auth');

//     User.findByToken(token).then((user) => {
//         if (!user) {
//             return Promise.reject();
//         }

//         req.user = user;
//         req.token = token;
//         next();
//     }).catch((e) => {
//         res.status(401).send();
//     });
// };

module.exports = { auth };