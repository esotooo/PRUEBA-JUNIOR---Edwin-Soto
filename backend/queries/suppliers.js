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
var queriesSQL_1 = require("./queriesSQL");
var serverError_1 = require("../helpers/serverError");
var router = (0, express_1.Router)();
//API's PROVEEDORES
/**
 * Obtener todos los proveedores
 * Protegido con JWT
 * Devuelve un listado de proveedores o un mensaje si no hay registros
 */
router.get('/suppliers', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var suppliers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, connection_1.default.query(queriesSQL_1.SupplierQueries.view)];
            case 1:
                suppliers = (_a.sent())[0];
                if (suppliers.length > 0) {
                    res.status(200).json({ success: true, data: suppliers });
                }
                else {
                    res.status(200).json({ success: false, data: [], message: 'No se encontrar proveedores.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                (0, serverError_1.handleServerError)(res, error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Agregar un nuevo proveedor
 * Requiere datos en el body
 * Devuelve el proveedor agregado con su ID generado
 */
router.post('/add-supplier', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, company_name, contact_person, email, id_type, NIT, phone, city, created_at, supplier, newSupplier, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, company_name = _a.company_name, contact_person = _a.contact_person, email = _a.email, id_type = _a.id_type, NIT = _a.NIT, phone = _a.phone, city = _a.city, created_at = _a.created_at;
                return [4 /*yield*/, connection_1.default.query(queriesSQL_1.SupplierQueries.add, [
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
                    res.status(200).json({ success: true, data: newSupplier, message: 'Proveedor agregado exitosamente.' });
                }
                else {
                    res.status(200).json({ success: false, data: [], message: 'No se ha agregado al proveedor.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                (0, serverError_1.handleServerError)(res, error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Actualizar un proveedor existente por ID
 * Requiere datos en el body y parámetro :id
 */
router.put('/edit-supplier/:id', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, company_name, contact_person, email, id_type, NIT, phone, city, supplier, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, company_name = _a.company_name, contact_person = _a.contact_person, email = _a.email, id_type = _a.id_type, NIT = _a.NIT, phone = _a.phone, city = _a.city;
                return [4 /*yield*/, connection_1.default.query(queriesSQL_1.SupplierQueries.update, [
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
                    res.status(200).json({ success: true, message: 'El proveedor fue actualizado exitosamente.' });
                }
                else {
                    res.status(200).json({ success: false, message: 'No se encontraron registros.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                (0, serverError_1.handleServerError)(res, error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Eliminar un proveedor por ID
 */
router.delete('/delete-supplier/:id', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, supplier, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, connection_1.default.query(queriesSQL_1.SupplierQueries.delete, [id])];
            case 1:
                supplier = (_a.sent())[0];
                if (supplier.affectedRows > 0) {
                    res.status(200).json({ success: true, message: 'El proveedor fue eliminado exitosamente.' });
                }
                else {
                    res.status(200).json({ success: false, message: 'No se encontro el proveedor.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                (0, serverError_1.handleServerError)(res, error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Filtrar proveedores por nombre
 * Requiere query ?company_name=...
 */
router.get('/suppliers/search-by-name', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var company_name, results, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                company_name = req.query.company_name;
                if (!company_name) {
                    return [2 /*return*/, res.status(400).json({ success: false, data: [], message: 'El nombre de la compañia es requerido.' })];
                }
                return [4 /*yield*/, connection_1.default.query(queriesSQL_1.SupplierQueries.searchByName, ["%".concat(company_name, "%")])];
            case 1:
                results = (_a.sent())[0];
                if (results.length > 0) {
                    res.status(200).json({ success: true, data: results });
                }
                else {
                    res.status(200).json({ success: false, data: [], message: 'No se encontraron registros.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                (0, serverError_1.handleServerError)(res, error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Filtrar proveedores por tipo
 * Requiere query ?id_type=...
 */
router.get('/suppliers/search-by-type', verifyToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_type, results, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_type = req.query.id_type;
                if (!id_type) {
                    return [2 /*return*/, res.status(400).json({ success: true, data: [], message: 'El tipo de proveedor es requerido' })];
                }
                return [4 /*yield*/, connection_1.default.query(queriesSQL_1.SupplierQueries.searchByType, [id_type])];
            case 1:
                results = (_a.sent())[0];
                if (results.length > 0) {
                    res.status(200).json({ success: true, data: results });
                }
                else {
                    res.status(200).json({ success: false, data: [], message: 'No se encontraron registros.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                (0, serverError_1.handleServerError)(res, error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
