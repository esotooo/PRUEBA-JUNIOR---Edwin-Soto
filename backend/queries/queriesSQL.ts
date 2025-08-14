//Consulta para ver los proveedores
const viewSuppliers = `
  SELECT 
    s.id_supplier, 
    s.company_name, 
    s.contact_person, 
    s.email, 
    s.phone, 
    s.NIT, 
    s.city,
    s.id_type, 
    s.created_at,     
    t.supplier_type   
  FROM suppliers s
  INNER JOIN suppliers_type t ON s.id_type = t.id_type; 
`

//Consulta para agregar un proveedor
const addSupplier = `
   INSERT INTO suppliers(company_name, contact_person, email, id_type, NIT, phone, city, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?); `

//Consulta para actualizar los datos de un proveedor
const updateSupplier = `
  UPDATE suppliers
  SET 
  company_name = ?,
  contact_person = ?,
  email = ?,
  id_type = ?,
  NIT = ?,
  phone = ?,
  city = ?
  WHERE id_supplier = ?
`

//Consulta para eliminar un proveedor
const deleteSupplier = `DELETE FROM suppliers WHERE id_supplier = ?`

//Consulta para buscar por nombre
const searchByName = `
    SELECT s.*, t.supplier_type 
    FROM suppliers s
    INNER JOIN suppliers_type t ON s.id_type = t.id_type
    WHERE s.company_name LIKE ?
    `

//Consulta para buscar por tipo de proveedor
const searchByType = `
    SELECT s.*, t.supplier_type 
    FROM suppliers s
    INNER JOIN suppliers_type t ON s.id_type = t.id_type
    WHERE s.id_type = ?
    `


//Consulta para visualizar todos los tipos de proveedores
const supplierType = 'SELECT id_type, supplier_type FROM suppliers_type'
  

//Consulta login 
const login = 'SELECT id_user, email, pass FROM users WHERE email = ? '

export const SupplierQueries = {
  view: viewSuppliers,
  add: addSupplier,
  update: updateSupplier,
  delete: deleteSupplier,
  searchByName: searchByName,
  searchByType: searchByType
}

export const TypeQueries = {
  viewType: supplierType
}

export const LoginQueries = {
  login : login
}