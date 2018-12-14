const admin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.send('You do not have sufficient right!');
    }
    return next();
};

module.exports = { admin };
