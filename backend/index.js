"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var login_1 = require("./queries/login");
var suppliers_1 = require("./queries/suppliers");
var supplierType_1 = require("./queries/supplierType");
var PORT = 4000;
var app = express();
app.use(cors());
app.use(express.json());
//Usa router de inicio de sesión con prefijo '/api'
app.use('/api', login_1.default);
//Usa router de proveedores con prefijo '/api'
app.use('/api', suppliers_1.default);
//Usa router de tipos de proveedores con prefijo '/api'
app.use('/api', supplierType_1.default);
app.listen(PORT, function () {
    console.log("Application running in port http://localhost:".concat(PORT));
});
