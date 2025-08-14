import { useSupplier } from "../hooks/useSupplier"

// Componente de confirmación de eliminación de un proveedor
// Muestra un modal que permite al usuario confirmar o cancelar la acción
export default function ConfirmDelete() {
    const { state, dispatch, deleteSupplier } = useSupplier()

    // Obtener el ID del proveedor que se desea eliminar
    const supplierId = state.selectedIdToDelete
    if (!supplierId) return null // No renderiza nada si no hay proveedor seleccionado

    // Función para confirmar eliminación
    const handleConfirm = () => {
        deleteSupplier(supplierId) // Eliminar del backend o estado global
        dispatch({ type: 'remove-supplier', payload: {id: supplierId}}) // Actualizar estado local
    }

    // Función para cancelar la acción
    const handleCancel = () => dispatch({ type: 'close-confirmation', payload: {id: supplierId}})

    return (
        <div className="confirmation__overlay">
            <div className="confirmation__content">
                <h2>Eliminar Proveedor</h2>
                <p>¿Está seguro que desea eliminar este proveedor?</p>

                {/** BOTONES DE ACCION CONFIRMAR / CANCELAR */}
                <div className="confirmation__buttons">
                    <button onClick={handleCancel}>Cancelar</button>
                    <button onClick={handleConfirm} className="confirmation__delete">Eliminar</button>
                </div>
            </div>
        </div>
    )
}
