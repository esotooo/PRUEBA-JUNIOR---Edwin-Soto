import { useContext } from "react";
import { SupplierContext } from "../context/SuppliersContext";

export const useSupplier = () => {
    const context = useContext(SupplierContext)
    if(!context){
        throw new Error ('useSupplier must be used within a SupplierProvider')
    }
    return context
}