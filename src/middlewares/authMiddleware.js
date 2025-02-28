const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach user ID to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;
