import { RowDataPacket } from "mysql2";

// Representa un usuario en la base de datos
export interface User extends RowDataPacket{
    id_user: number
    email: string
    pass: string
}

// Representa un proveedor y su información detallada
export interface Supplier extends RowDataPacket{
    id_supplier: number
    company_name: string
    contact_person: string
    email: string
    id_type: number
    NIT: string
    phone: string
    city: string
    created_at: string
    supplier_type: string
}

// Representa los posibles tipos de proveedor
export interface SupplierType extends RowDataPacket{
    id_type: number
    supplier_type: string
}