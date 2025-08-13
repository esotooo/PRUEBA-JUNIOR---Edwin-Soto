import { useSupplier } from "../hooks/useSupplier"

export default function ConfirmDelete() {
    const { state, dispatch, deleteSupplier } = useSupplier()

    // Usar editingId o seleccionar algún id previamente
    const supplierId = state.selectedIdToDelete
    if (!supplierId) return null

    const handleConfirm = () => {
        deleteSupplier(supplierId)
        dispatch({ type: 'remove-supplier', payload: {id: supplierId}})
    }

    const handleCancel = () => dispatch({ type: 'close-confirmation', payload: {id: supplierId}})

    return (
        <div className="confirmation__overlay">
            <div className="confirmation__content">
                <h2>Eliminar Proveedor</h2>
                <p>¿Está seguro que desea eliminar este proveedor?</p>
                <div className="confirmation__buttons">
                    <button onClick={handleCancel}>Cancelar</button>
                    <button onClick={handleConfirm} className="confirmation__delete">Eliminar</button>
                </div>
            </div>
        </div>
    )
}
