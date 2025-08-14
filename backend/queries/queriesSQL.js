"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginQueries = exports.TypeQueries = exports.SupplierQueries = void 0;
//Consulta para ver los proveedores
var viewSuppliers = "\n  SELECT \n    s.id_supplier, \n    s.company_name, \n    s.contact_person, \n    s.email, \n    s.phone, \n    s.NIT, \n    s.city,\n    s.id_type, \n    s.created_at,     \n    t.supplier_type   \n  FROM suppliers s\n  INNER JOIN suppliers_type t ON s.id_type = t.id_type; \n";
//Consulta para agregar un proveedor
var addSupplier = "\n   INSERT INTO suppliers(company_name, contact_person, email, id_type, NIT, phone, city, created_at)\n   VALUES (?, ?, ?, ?, ?, ?, ?, ?); ";
//Consulta para actualizar los datos de un proveedor
var updateSupplier = "\n  UPDATE suppliers\n  SET \n  company_name = ?,\n  contact_person = ?,\n  email = ?,\n  id_type = ?,\n  NIT = ?,\n  phone = ?,\n  city = ?\n  WHERE id_supplier = ?\n";
//Consulta para eliminar un proveedor
var deleteSupplier = "DELETE FROM suppliers WHERE id_supplier = ?";
//Consulta para buscar por nombre
var searchByName = "\n    SELECT s.*, t.supplier_type \n    FROM suppliers s\n    INNER JOIN suppliers_type t ON s.id_type = t.id_type\n    WHERE s.company_name LIKE ?\n    ";
//Consulta para buscar por tipo de proveedor
var searchByType = "\n    SELECT s.*, t.supplier_type \n    FROM suppliers s\n    INNER JOIN suppliers_type t ON s.id_type = t.id_type\n    WHERE s.id_type = ?\n    ";
//Consulta para visualizar todos los tipos de proveedores
var supplierType = 'SELECT id_type, supplier_type FROM suppliers_type';
//Consulta login 
var login = 'SELECT id_user, email, pass FROM users WHERE email = ? ';
exports.SupplierQueries = {
    view: viewSuppliers,
    add: addSupplier,
    update: updateSupplier,
    delete: deleteSupplier,
    searchByName: searchByName,
    searchByType: searchByType
};
exports.TypeQueries = {
    viewType: supplierType
};
exports.LoginQueries = {
    login: login
};
