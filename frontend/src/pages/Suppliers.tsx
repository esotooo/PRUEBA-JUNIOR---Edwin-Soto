import { useSupplier } from "../hooks/useSupplier"
import { IoIosAddCircle } from "react-icons/io"
import SuppliersList from "../components/SuppliersList"
import SuppliersForm from "../components/SuppliersForm"
import ConfirmDelete from "../components/ConfirmDelete"
import SupplierSearchBar from "../components/SupplierSearchBar"
import MainHeader from "../components/MainHeader"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"

// Componente principal de la página de Proveedores
export default function Suppliers() {
    // Accedemos al estado global y dispatch del contexto de proveedores
    const { state, dispatch } = useSupplier()
    // Solo usamos checkToken del contexto de autenticación para validar el token
    const { checkToken } = useAuth()

    // Función para cerrar el formulario de agregar/editar proveedor
    const closeForm = () => {
        dispatch({ type: 'close-form' })
    }

    // useEffect para verificar el token una sola vez al cargar la página
    useEffect(() => {
        checkToken() // valida si el token ha expirado
    }, [])

    return (
        <>
            {/* Header principal de la página */}
            <MainHeader />

            <div className="main__content">
                <div className="content__title">
                    <h2>Proveedores</h2>
                    {/* Botón para mostrar el formulario de agregar proveedor */}
                    <div className="button add__button" onClick={() => dispatch({ type: 'show-form' })}>
                        <IoIosAddCircle />
                        <p>Agregar</p>
                    </div>
                </div>

                {/* Barra de búsqueda de proveedores */}
                <SupplierSearchBar />

                <div className="suppliers__card">
                    {/* Renderizamos la lista de proveedores si hay resultados */}
                    {state.suppliers.length > 0 ? (
                        state.suppliers.map(supplier => (
                            <SuppliersList key={supplier.id_supplier} supplier={supplier} />
                        ))
                    ) : (
                        // Si no hay resultados, mostramos mensaje
                        state.noResultsMessage && <p>{state.noResultsMessage}</p>
                    )}
                </div>
            </div>

            {/* Formularios modales */}
            <div>
                {state.form && <SuppliersForm onClose={closeForm} />}
                {state.confirmation && <ConfirmDelete />}
            </div>
        </>
    )
}
