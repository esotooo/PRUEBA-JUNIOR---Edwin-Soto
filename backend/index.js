"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var PORT = 4000;
var app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, function () {
    console.log("Application running in port http://localhost:".concat(PORT));
});
