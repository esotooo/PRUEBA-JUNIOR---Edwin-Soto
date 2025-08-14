import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket{
    id_user: number
    email: string
    pass: string
}

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

export interface SupplierType extends RowDataPacket{
    id_type: number
    supplier_type: string
}