const isLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized. Please log in." });
};

module.exports = isLoggedIn;
