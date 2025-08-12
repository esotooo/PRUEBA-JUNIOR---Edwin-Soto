import { SupplierProvider } from "../context/SuppliersContext"
import Suppliers from "../pages/Suppliers"

export default function SuppliersPage() {
  return (
    <SupplierProvider>
      <Suppliers />
    </SupplierProvider>
  )
}
