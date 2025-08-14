"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = void 0;
var handleServerError = function (res, error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
};
exports.handleServerError = handleServerError;
