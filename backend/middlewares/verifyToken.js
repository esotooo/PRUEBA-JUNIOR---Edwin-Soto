"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
// Middleware para proteger rutas y validar JWT
var verifyToken = function (req, res, next) {
    var _a;
    // Extrae el token del encabezado Authorization (formato "Bearer <token>")
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // Si no se proporciona token, se deniega el acceso
    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado: no se ha proporcionado un token válido.' });
    }
    // Verifica la validez del token usando la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            // Token inválido o expirado
            return res.status(401).json({ message: 'El token es inválido o ha expirado. Por favor, inicia sesión nuevamente.' });
        }
        // Almacena los datos decodificados en la request para usarlos en la ruta
        req.user = decoded;
        next();
    });
};
exports.default = verifyToken;
