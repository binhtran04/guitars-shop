const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100,
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
});

// userSchema.pre('save', function (next) {
//     const user = this;

//     bcrypt.genSalt(SALT_I, (genSaltErr, salt) => {
//         if (genSaltErr) return next(genSaltErr);

//         bcrypt.hash(user.password, salt, (hashErr, hash) => {
//             if (hashErr) return next(hashErr);

//             user.password = hash;
//             next();
//         });
//     });
// });

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        next();
    } else {
        try {
            const salt = await bcrypt.genSalt(SALT_I);
            const hash = await bcrypt.hash(user.password, salt);

            user.password = hash;

            next();
        } catch (err) {
            next(err);
        }
    }
});

userSchema.methods.comparePassword = function (requestPassword, cb) {
    bcrypt.compare(requestPassword, this.password, (err, isMatched) => {
        if (err) {
            cb(err);
        } else {
            cb(null, isMatched);
        }
    });
};

userSchema.methods.generateToken = function (cb) {
    const user = this;

    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save()
        .then((savedUser) => {
            cb(null, savedUser);
        })
        .catch((err) => {
            cb(err);
        });
};

userSchema.statics.findByToken = function (token, cb) {
    const User = this;

    jwt.verify(token, process.env.SECRET, (err, decode) => {
        User.findOne({ _id: decode, token })
            .then((user) => {
                cb(null, user);
            }).catch((fErr) => {
                cb(fErr);
            });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};
