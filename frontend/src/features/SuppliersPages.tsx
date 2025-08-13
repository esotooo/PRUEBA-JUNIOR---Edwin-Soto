import { SupplierProvider } from "../context/SuppliersContext"
import Suppliers from "../pages/Suppliers"

export default function SuppliersPages() {
  return (
    <SupplierProvider>
      <Suppliers />
    </SupplierProvider>
  )
}
