import type { suppliers, supplierType } from "../types/types";

//Acciones que realizar la pagina de proveedores
export type SupplierActions = 
    {type: 'show-form'} |
    {type: 'close-form'} |
    {type: 'show-confirmation', payload: {id: suppliers['id_supplier']}} |
    {type: 'close-confirmation', payload: {id: suppliers['id_supplier']}} | 
    {type: 'set-suppliers', payload: {suppliers: suppliers[]}} | 
    {type: 'set-types', payload: {supplierType: supplierType[]}} |
    {type: 'add-supplier', payload: {supplier: suppliers}} |
    {type: 'remove-supplier', payload: {id: suppliers['id_supplier']}} |
    {type: 'edit-supplier', payload: {id: suppliers['id_supplier']}} |
    {type: 'update-supplier', payload: {supplier: suppliers}} | 
    {type: 'filter-type', payload: {id: supplierType['id_type']}} |
    {type: 'filter-name', payload: {name: suppliers['company_name']}} |
    {type: 'no-results', payload: {message: string}} |
    {type: 'set-message', payload: {type: 'success' | 'error'; text: string } } |
    {type: 'clear-message'}


//Tipado de nuestras variables
export type SupplierState = {
    form: boolean
    confirmation: boolean
    selectedIdToDelete: suppliers['id_supplier'] | null
    suppliers: suppliers[]
    editingId: suppliers['id_supplier'] | null
    currentCategory: supplierType['id_type'] | null
    currentName: suppliers['company_name']
    supplierType: supplierType[]
    noResultsMessage: string
    message: { type: 'success' | 'error'; text: string } | null
}

//Iniciamos nuestro estado
export const initialState : SupplierState = {
    form: false,
    suppliers: [],
    editingId: null,
    currentCategory: null,
    currentName: '',
    supplierType: [],
    confirmation: false,
    selectedIdToDelete: null,
    noResultsMessage: '',
    message: null
}

export const supplierReducer = (
    state: SupplierState,
    action: SupplierActions
) : SupplierState => {
    switch(action.type){
        case 'show-form':
            return{
                ...state,
                form: true
            }
        case 'close-form':
            return{
                ...state,
                form: false,
                editingId: null
            }
        case 'set-suppliers':
            return{
                ...state,
                suppliers: action.payload.suppliers
            }
        case 'add-supplier':
            return{
                ...state,
                suppliers: [...state.suppliers, action.payload.supplier],
                form: false
            } 
        case 'remove-supplier':
            return{
                ...state,
                suppliers: state.suppliers.filter(supplier => supplier.id_supplier != action.payload.id)
            }
        case 'edit-supplier':
            return{
                ...state,
                editingId: action.payload.id,
                form: true
            }
        case 'update-supplier':
            return{
                ...state,
                suppliers: state.suppliers.map( supplier => supplier.id_supplier === action.payload.supplier.id_supplier ? {
                    ...supplier, ...action.payload.supplier
                } : supplier ),
                editingId: null,
                form: false
            }
        case 'filter-name':
            return{
                ...state,
                currentName: action.payload.name
            }
        case 'filter-type':
            return{
                ...state,
                currentCategory: action.payload.id
            }
        case 'set-types':
            return{
                ...state,
                supplierType: action.payload.supplierType
            }
        case 'show-confirmation':
            return{
                ...state,
                confirmation: true,
                selectedIdToDelete: action.payload.id
            }
        case 'close-confirmation':
            return{
                ...state,
                confirmation: false,
                selectedIdToDelete: null
            }
        case 'no-results':
            return{
                ...state,
                noResultsMessage: action.payload.message
            }
        case 'set-message':
            return{
                ...state,
                message: {type: action.payload.type, text: action.payload.text}
            }
        case 'clear-message':
            return{
                ...state,
                message: null
            }

        default:
            return state
    }
}

