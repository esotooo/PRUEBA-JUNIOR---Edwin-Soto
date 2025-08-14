// Componente que envuelve la página de proveedores con su contexto
// Permite que cualquier componente dentro de <Suppliers /> acceda al SupplierContext
import { SupplierProvider } from "../context/SuppliersContext"
import Suppliers from "../pages/Suppliers"

export default function SuppliersPages() {
  return (
    <SupplierProvider>
      <Suppliers />
    </SupplierProvider>
  )
}
