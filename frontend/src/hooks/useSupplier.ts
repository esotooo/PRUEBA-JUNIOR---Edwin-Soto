import { useContext } from "react";
import { SupplierContext } from "../context/SuppliersContext";

// Hook personalizado para acceder al contexto de proveedores
// Permite usar el estado y funciones de SupplierContext en cualquier componente
export const useSupplier = () => {
    const context = useContext(SupplierContext)

    // Validación: asegurar que el hook se use dentro de un SupplierProvider
    if (!context) {
        throw new Error('useSupplier must be used within a SupplierProvider')
    }

    // Retorna el contexto completo (estado + funciones)
    return context
}