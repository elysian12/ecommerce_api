const jwt = require('jsonwebtoken')



const verifyToken = (req, res, next) => {

    const authHeaders = req.headers.token;
    if (authHeaders) {
        const token = authHeaders.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    status: "Failed",
                    message: "Invalid Token"
                });
                return;
            } else {

                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).json({
            status: "Failed",
            message: "You are not Authenticated"
        });
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: "Failed",
                message: "You are not Allowed"
            });
        }
    });
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: "Failed",
                message: "You are not Allowed"
            });
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization }