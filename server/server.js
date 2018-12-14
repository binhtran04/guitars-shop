const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');

const app = express();
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// USERS ROUTES
app.use('/api/users', userRouter);

app.get('/api/product/articles', (req, res) => {
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

app.get('/api/product/articles_by_id', (req, res) => {
    const { type } = req.query;
    let items = req.query.id;

    if (type === 'array') {
        const ids = items.split(',');
        items = ids.map(id => mongoose.Types.ObjectId(id));
    }

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

// PRODUCTS ROUTES
app.post('/api/product/article', auth, admin, (req, res) => {
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
});

// WOODS ROUTES
app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save()
        .then((doc) => {
            res.status(200).json({
                success: true,
                wood: doc,
            });
        })
        .catch((err) => {
            res.json({ success: false, err });
        });
});

app.get('/api/product/woods', (req, res) => {
    Wood.find({})
        .then((woods) => {
            res.status(200).send(woods);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// BRANDS ROUTES
app.post('/api/product/brand', auth, admin, (req, res) => {
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
});

app.get('/api/product/brands', (req, res) => {
    Brand.find({})
        .then((brands) => {
            res.status(200).send(brands);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
