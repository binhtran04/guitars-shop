const express = require('express');
const bodyParser = require('body-parser');

const { Wood } = require('../models/wood');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const woodRouter = express.Router();

woodRouter.use(bodyParser.json());

woodRouter.route('/')
    // Create a new wood
    .post(auth, admin, (req, res) => {
        const wood = new Wood(req.body);

        wood
            .save()
            .then((doc) => {
                res.status(200).json({
                    success: true,
                    wood: doc,
                });
            })
            .catch((err) => {
                res.json({ success: false, err });
            });
    })
    // getting all woods
    .get((req, res) => {
        Wood.find({})
            .then((woods) => {
                res.status(200).send(woods);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });

module.exports = woodRouter;
