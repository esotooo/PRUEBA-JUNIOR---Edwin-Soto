export type suppliers = {
    id_supplier?: number
    company_name: string
    contact_person: string
    email: string
    id_type: number
    supplier_type: string
    NIT: string
    phone: string
    city: string
    created_at: string
}

export type SupplierDB = {
    id_supplier?: number
    company_name: string
    contact_person: string
    email: string
    id_type: number
    NIT: string
    phone: string
    city: string
    created_at: string
}

export type supplierType = {
    id_type?: number
    supplier_type: string
}