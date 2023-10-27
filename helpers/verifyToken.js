const config = require('./config');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(500).json({
            auth: false,
            errorMessage: 'No token provided'
        });
    }

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    const decoded = jwt.verify(token, config.secret);

    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;