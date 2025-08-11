"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var login_1 = require("./queries/login");
var PORT = 4000;
var app = express();
app.use(cors());
app.use(express.json());
//Usa router de login con prefijo '/api'
app.use('/api', login_1.default);
app.listen(PORT, function () {
    console.log("Application running in port http://localhost:".concat(PORT));
});
