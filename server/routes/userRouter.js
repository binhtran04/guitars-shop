const express = require('express');
const bodyParser = require('body-parser');

// Models
const { User } = require('../models/user');

// Middlewares
const { auth } = require('../middleware/auth');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/register').post((req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.status(200).json({
                success: true,
            });
        })
        .catch((err) => {
            res.json({ success: false, err });
        });
});

userRouter.route('/auth').get(auth, (req, res) => {
    res.status(200).json({
        isAdmin: Boolean(req.user.role),
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
    });
});

userRouter.route('/login').post((req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.json({ loginSuccess: false, message: 'Auth failed! Email not found!' });
            } else {
                user.comparePassword(req.body.password, (err, isMatched) => {
                    if (!isMatched) {
                        res.json({ loginSuccess: false, message: 'Auth failed! Wrong password!' });
                    } else {
                        user.generateToken((gErr, gUser) => {
                            if (gErr) {
                                res.status(403).send(gErr);
                            } else {
                                res.cookie('x_auth', gUser.token).status(200).json({
                                    loginSuccess: true,
                                });
                            }
                        });
                    }
                });
            }
        }).catch(() => {
            res.json({ loginSuccess: false, message: 'Unexpected error' });
        });
});

userRouter.route('/logout').get(auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' })
        .then(() => {
            res.status(200).send({
                success: true,
            });
        }).catch((err) => {
            res.json({ success: 'fasle', err });
        });
});

module.exports = userRouter;
