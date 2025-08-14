"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../db/connection");
var express_1 = require("express");
var verifyToken_1 = require("../middlewares/verifyToken");
var router = (0, express_1.Router)();
//API's PROVEEDORES
//Visualizacion de proveedores con datos especificos para visualizacion general
router.get('/suppliers', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, suppliers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = "\n            SELECT \n            s.id_supplier, \n            s.company_name, \n            s.contact_person, \n            s.email, \n            s.phone, \n            s.NIT, \n            s.city,\n            s.id_type, \n            s.created_at,     \n            t.supplier_type   \n            FROM suppliers s\n            INNER JOIN suppliers_type t ON s.id_type = t.id_type;\n        ";
                return [4 /*yield*/, connection_1.default.query(query)];
            case 1:
                suppliers = (_a.sent())[0];
                if (suppliers.length > 0) {
                    res.status(200).json({ success: true, data: suppliers });
                }
                else {
                    res.status(404).json({ success: false, message: 'No suppliers found.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Agregar proveedores a la base de datos
router.post('/add-supplier', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, company_name, contact_person, email, id_type, NIT, phone, city, created_at, query, supplier, newSupplier, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, company_name = _a.company_name, contact_person = _a.contact_person, email = _a.email, id_type = _a.id_type, NIT = _a.NIT, phone = _a.phone, city = _a.city, created_at = _a.created_at;
                query = 'INSERT INTO suppliers(company_name, contact_person, email, id_type, NIT, phone, city, created_at) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                return [4 /*yield*/, connection_1.default.query(query, [
                        company_name, contact_person, email, id_type, NIT, phone, city, created_at
                    ])];
            case 1:
                supplier = (_b.sent())[0];
                if (supplier.affectedRows > 0) {
                    newSupplier = {
                        id_supplier: supplier.insertId,
                        company_name: company_name,
                        contact_person: contact_person,
                        email: email,
                        id_type: id_type,
                        NIT: NIT,
                        phone: phone,
                        city: city,
                        created_at: created_at
                    };
                    res.status(200).json(newSupplier);
                }
                else {
                    res.status(401).json({ message: 'No records were found.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Actualizar proveedor tomando su ID
router.put('/edit-supplier/:id', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, company_name, contact_person, email, id_type, NIT, phone, city, query, supplier, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, company_name = _a.company_name, contact_person = _a.contact_person, email = _a.email, id_type = _a.id_type, NIT = _a.NIT, phone = _a.phone, city = _a.city;
                query = 'UPDATE suppliers ' +
                    'SET company_name = ?, contact_person = ?, email = ?, id_type = ?, NIT = ?, phone = ?, city = ? ' +
                    'WHERE id_supplier = ?';
                return [4 /*yield*/, connection_1.default.query(query, [
                        company_name,
                        contact_person,
                        email,
                        id_type,
                        NIT,
                        phone,
                        city,
                        id
                    ])];
            case 1:
                supplier = (_b.sent())[0];
                if (supplier.affectedRows > 0) {
                    res.status(200).json({ message: 'Supplier updated successfully' });
                }
                else {
                    res.status(404).json({ message: 'Supplier not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Eliminar proveedor tomando su id
router.delete('/delete-supplier/:id', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, supplier, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                query = 'DELETE FROM suppliers WHERE id_supplier = ?';
                return [4 /*yield*/, connection_1.default.query(query, [id])];
            case 1:
                supplier = (_a.sent())[0];
                if (supplier.affectedRows > 0) {
                    res.status(200).json({ message: 'Supplier deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Supplier not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Filtrar proveedores por nombre
router.get('/suppliers/search-by-name', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var company_name, query, results, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                company_name = req.query.company_name;
                if (!company_name) {
                    return [2 /*return*/, res.status(400).json({ message: 'Company name is required' })];
                }
                query = "\n        SELECT s.*, t.supplier_type \n        FROM suppliers s\n        INNER JOIN suppliers_type t ON s.id_type = t.id_type\n        WHERE s.company_name LIKE ?\n        ";
                return [4 /*yield*/, connection_1.default.query(query, ["%".concat(company_name, "%")])];
            case 1:
                results = (_a.sent())[0];
                if (results.length > 0) {
                    res.status(200).json(results);
                }
                else {
                    res.status(404).json({ message: 'No records found.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Filtrar proveedores por tipo
router.get('/suppliers/search-by-type', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_type, query, results, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_type = req.query.id_type;
                if (!id_type) {
                    return [2 /*return*/, res.status(400).json({ message: 'Supplier type id is required' })];
                }
                query = "\n        SELECT s.*, t.supplier_type \n        FROM suppliers s\n        INNER JOIN suppliers_type t ON s.id_type = t.id_type\n        WHERE s.id_type = ?\n        ";
                return [4 /*yield*/, connection_1.default.query(query, [id_type])];
            case 1:
                results = (_a.sent())[0];
                if (results.length > 0) {
                    res.status(200).json(results);
                }
                else {
                    res.status(404).json({ message: 'No records found.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
