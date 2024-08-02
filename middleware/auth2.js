const jwt = require('jsonwebtoken');
const appModel = require(`../model/appModels`);

const authenticator = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: "authorization required" });
        }
        const token = auth.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "invalid token" });
        }

        const decodedToken = jwt.verify(token, process.env.jwt_secret);

        const user = await myModel.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ message: "authentication failed: user not found" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: "authentication failed: user not an admin" });
        }

        req.user = decodedToken;
        next();

    } catch (error) {
        console.error("Error verifying token:", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "error verifying user" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = authenticator



