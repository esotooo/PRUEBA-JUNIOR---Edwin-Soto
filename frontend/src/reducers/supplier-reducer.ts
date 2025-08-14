import type { suppliers, supplierType } from "../types/types"

//Acciones que realizar la página de proveedores
export type SupplierActions = 
    {type: 'show-form'} | // Abrir formulario de proveedor
    {type: 'close-form'} | // Cerrar formulario y limpiar edición
    {type: 'show-confirmation', payload: {id: suppliers['id_supplier']}} | // Mostrar modal de confirmación de borrado
    {type: 'close-confirmation', payload: {id: suppliers['id_supplier']}} | // Cerrar modal de confirmación
    {type: 'set-suppliers', payload: {suppliers: suppliers[]}} | // Establecer lista de proveedores
    {type: 'set-types', payload: {supplierType: supplierType[]}} | // Establecer lista de tipos de proveedores
    {type: 'add-supplier', payload: {supplier: suppliers}} | // Agregar proveedor nuevo
    {type: 'remove-supplier', payload: {id: suppliers['id_supplier']}} | // Eliminar proveedor
    {type: 'edit-supplier', payload: {id: suppliers['id_supplier']}} | // Marcar proveedor para edición
    {type: 'update-supplier', payload: {supplier: suppliers}} | // Actualizar proveedor editado
    {type: 'filter-type', payload: {id: supplierType['id_type']}} | // Filtrar proveedores por tipo
    {type: 'filter-name', payload: {name: suppliers['company_name']}} | // Filtrar proveedores por nombre
    {type: 'no-results', payload: {message: string}} | // Mostrar mensaje de "sin resultados"
    {type: 'set-message', payload: {type: 'success' | 'error'; text: string } } | // Mostrar mensaje de éxito o error
    {type: 'clear-message'} // Limpiar mensaje

//Tipado de nuestras variables de estado
export type SupplierState = {
    form: boolean // Controla si el formulario está abierto
    confirmation: boolean // Controla si el modal de confirmación está abierto
    selectedIdToDelete: suppliers['id_supplier'] | null // Id del proveedor seleccionado para borrar
    suppliers: suppliers[] // Lista de proveedores
    editingId: suppliers['id_supplier'] | null // Id del proveedor que se está editando
    currentCategory: supplierType['id_type'] | null // Filtro por tipo de proveedor
    currentName: suppliers['company_name'] // Filtro por nombre de proveedor
    supplierType: supplierType[] // Lista de tipos de proveedores
    noResultsMessage: string // Mensaje cuando no hay resultados
    message: { type: 'success' | 'error'; text: string } | null // Mensaje global de éxito o error
}

//Estado inicial
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

//Reducer para manejar las acciones de proveedores
export const supplierReducer = (
    state: SupplierState,
    action: SupplierActions
) : SupplierState => {
    switch(action.type){
        case 'show-form':
            return{
                ...state,
                form: true // Abrir formulario
            }
        case 'close-form':
            return{
                ...state,
                form: false,
                editingId: null // Cerrar formulario y limpiar edición
            }
        case 'set-suppliers':
            return{
                ...state,
                suppliers: action.payload.suppliers // Actualizar lista de proveedores
            }
        case 'add-supplier':
            return{
                ...state,
                suppliers: [...state.suppliers, action.payload.supplier], // Agregar proveedor
                form: false // Cerrar formulario después de agregar
            } 
        case 'remove-supplier':
            return{
                ...state,
                suppliers: state.suppliers.filter(supplier => supplier.id_supplier != action.payload.id) // Eliminar proveedor
            }
        case 'edit-supplier':
            return{
                ...state,
                editingId: action.payload.id,
                form: true // Abrir formulario para edición
            }
        case 'update-supplier':
            return{
                ...state,
                suppliers: state.suppliers.map(supplier => supplier.id_supplier === action.payload.supplier.id_supplier ? {
                    ...supplier, ...action.payload.supplier
                } : supplier ),
                editingId: null,
                form: false // Cerrar formulario después de actualizar
            }
        case 'filter-name':
            return{
                ...state,
                currentName: action.payload.name // Filtrar por nombre
            }
        case 'filter-type':
            return{
                ...state,
                currentCategory: action.payload.id // Filtrar por tipo
            }
        case 'set-types':
            return{
                ...state,
                supplierType: action.payload.supplierType // Actualizar lista de tipos
            }
        case 'show-confirmation':
            return{
                ...state,
                confirmation: true,
                selectedIdToDelete: action.payload.id // Mostrar modal de confirmación
            }
        case 'close-confirmation':
            return{
                ...state,
                confirmation: false,
                selectedIdToDelete: null // Cerrar modal de confirmación
            }
        case 'no-results':
            return{
                ...state,
                noResultsMessage: action.payload.message // Mensaje de sin resultados
            }
        case 'set-message':
            return{
                ...state,
                message: {type: action.payload.type, text: action.payload.text} // Mostrar mensaje global
            }
        case 'clear-message':
            return{
                ...state,
                message: null // Limpiar mensaje
            }

        default:
            return state // Por defecto retornamos el estado actual
    }
}
