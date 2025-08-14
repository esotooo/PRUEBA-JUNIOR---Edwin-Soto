"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = void 0;
// Manejador centralizado para errores del servidor
// Envía un mensaje genérico al cliente y registra el error en la consola
var handleServerError = function (res, error) {
    console.error(error); // Loguea el error para depuración
    res.status(500).json({ success: false, message: 'Internal server error' }); // Mensaje genérico para el cliente
};
exports.handleServerError = handleServerError;
