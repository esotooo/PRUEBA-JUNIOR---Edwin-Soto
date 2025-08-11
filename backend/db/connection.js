"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2/promise");
var dotenv = require("dotenv");
dotenv.config();
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});
exports.default = pool;
