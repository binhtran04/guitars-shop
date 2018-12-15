const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
// Routers
const userRouter = require('./routes/userRouter');
const brandRouter = require('./routes/brandRouter');
const woodRouter = require('./routes/woodRouter');
const productRouter = require('./routes/productRouter');

const app = express();
require('dotenv').config();

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRouter);
app.use('/api/brands', brandRouter);
app.use('/api/woods', woodRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
