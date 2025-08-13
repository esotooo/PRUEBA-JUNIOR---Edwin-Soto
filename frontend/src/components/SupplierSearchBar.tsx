import { FaSearch } from "react-icons/fa";
import { useSupplier } from "../hooks/useSupplier"
import { IoFilterCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import debounce from 'debounce';



export default function SupplierSearchBar() {

    const {state, dispatch, searchByName, searchByType, fetchTypes, fetchSuppliers} = useSupplier()
    
    const [selectedType, setSelectedType] = useState<number | "">("");

    useEffect(() => {
        fetchTypes()
    }, [])

    //Funcion para hacer busqueda despues de 500ms de que el usuario deje de escribir
    const debouncedSearch = debounce((name: string) => {
        if(name.trim()){
            searchByName(name.trim())
        }else{
            fetchSuppliers()
        }
    }, 500)

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        dispatch({type: 'filter-name', payload: {name: value}})
        debouncedSearch(value)
    }

    const handleTypeChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedType(value ? Number(value) : "")
        if (value && Number(value) !== 0) {
          searchByType(Number(value))
        } else {
          fetchSuppliers()
        }
    }

    return (
        <div className="main__searchbar">

            {/** BARRA DE BUSQUEDA */}
                <input 
                    type="text" 
                    placeholder="Buscar por nombre..."
                    value={state.currentName}
                    onChange={handleSearch}               
                />

            {/** SELECT PARA BUSCAR POR TIPO */}
            <div>
                <IoFilterCircleSharp />
                {/** VISTA PARA COMPUTADORAS*/}
                <select name="" id="" onChange={handleTypeChange} value={selectedType|| 0}>
                    <option value={0}>--- Seleccione una opción ---</option>
                    {state.supplierType.map(type => (
                        <option key={type.id_type} value={type.id_type}>{type.supplier_type}</option>
                    ))}
                </select>

                {/** VISTA PARA TELEFONOS Y TABLETS */}
                <select name="" id="" onChange={handleTypeChange} value={selectedType || 0}>
                    <option value={0}>--</option>
                    {state.supplierType.map(type => (
                        <option key={type.id_type} value={type.id_type}>{type.supplier_type}</option>
                    ))}
                </select>

            </div>

        </div>
    )
}
