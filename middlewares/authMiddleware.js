// authMiddleware.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "No token provided, authorization denied"
        });
    }

    try {
        const response = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = response.userId;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Token is invalid or expired"
        });
    }
}

module.exports = {
    authMiddleware
};
