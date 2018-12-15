const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { Product } = require('../models/product');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
    // Create new Product
    .post(auth, admin, (req, res) => {
        const product = new Product(req.body);

        product
            .save()
            .then((doc) => {
                res.status(200).json({
                    success: true,
                    product: doc,
                });
            })
            .catch((err) => {
                res.json({ success: false, err });
            });
    })
    // get all products with params
    .get((req, res) => {
        const { order = 'asc', sortBy = '_id' } = req.query;
        const limit = parseInt(req.query.limit, 10) || 100;

        Product.find()
            .populate('brand')
            .populate('wood')
            .sort([[sortBy, order]])
            .limit(limit)
            .exec()
            .then((docs) => {
                res.status(200).send(docs);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });

// Get products by id
productRouter.route('/:ids')
    .get((req, res) => {
        const { ids } = req.params;

        // Convert to ObjectId array
        let items = ids.split(',');
        items = items.map(id => mongoose.Types.ObjectId(id));

        Product.find({ _id: { $in: items } })
            .populate('brand')
            .populate('wood')
            .exec()
            .then((docs) => {
                res.status(200).send(docs);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });

module.exports = productRouter;
