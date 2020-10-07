const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // obtener el token desde que está en el header del req
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'Token ausente. Autorización denegada' });
    }

    // si llega hasta acá es porque existe un token, ahora hay que verificarlo
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'El token no es válido. Intente loguearse nuevamente' });
    }
};