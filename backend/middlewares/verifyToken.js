"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var _a;
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Espera formato "Bearer <token>"
    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado: no se ha proporcionado un token válido.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'El token es inválido o ha expirado. Por favor, inicia sesión nuevamente.' });
        }
        req.user = decoded;
        next();
    });
};
exports.default = verifyToken;
