const express = require('express');
const bodyParser = require('body-parser');

const { Brand } = require('../models/brand');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const brandRouter = express.Router();

brandRouter.use(bodyParser.json());

brandRouter.route('/')
    // Create a new brand
    .post(auth, admin, (req, res) => {
        const brand = new Brand(req.body);

        brand
            .save()
            .then((doc) => {
                res.status(200).json({
                    success: true,
                    brand: doc,
                });
            })
            .catch((err) => {
                res.json({ success: false, err });
            });
    })
    // getting all brands
    .get((req, res) => {
        Brand.find({})
            .then((brands) => {
                res.status(200).send(brands);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });

module.exports = brandRouter;
