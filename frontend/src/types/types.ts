// Tipo para representar un proveedor con información combinada de la DB y su tipo
export type suppliers = {
    id_supplier?: number        // ID del proveedor (opcional porque puede generarse automáticamente)
    company_name: string        // Nombre de la compañía
    contact_person: string      // Persona de contacto
    email: string               // Correo electrónico
    id_type: number             // ID del tipo de proveedor
    supplier_type: string       // Nombre del tipo de proveedor
    NIT: string                 // Número de Identificación Tributaria
    phone: string               // Teléfono de contacto
    city: string                // Ciudad del proveedor
    created_at: string          // Fecha de creación del registro
}

// Tipo usado para operaciones directamente con la base de datos
export type SupplierDB = {
    id_supplier?: number        // ID del proveedor
    company_name: string
    contact_person: string
    email: string
    id_type: number
    NIT: string
    phone: string
    city: string
    created_at: string
}

// Tipo que representa los distintos tipos de proveedores
export type supplierType = {
    id_type?: number            // ID del tipo (opcional si se genera automáticamente)
    supplier_type: string       // Nombre del tipo de proveedor
}
