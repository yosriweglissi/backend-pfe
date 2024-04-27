const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    var token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: token });
    }
    token=token.split(' ')[1]
    jwt.verify(token, 'yosri', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: token });
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyToken;