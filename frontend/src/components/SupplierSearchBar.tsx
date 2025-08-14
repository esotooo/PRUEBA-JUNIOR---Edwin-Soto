import { useSupplier } from "../hooks/useSupplier"
import { IoFilterCircleSharp } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import debounce from 'debounce';

// Componente de barra de búsqueda y filtrado para proveedores
// Permite buscar por nombre con debounce y filtrar por tipo de proveedor
export default function SupplierSearchBar() {

    const {state, dispatch, searchByName, searchByType, fetchTypes, fetchSuppliers} = useSupplier()
    
    const [selectedType, setSelectedType] = useState<number | "">("");
    const [showFilter, setShowFilter] = useState(false)
    const filterRef = useRef<HTMLDivElement>(null);

    // Cargar tipos de proveedores al montar el componente
    useEffect(() => {
        fetchTypes()
    }, [])

    // Cerrar dropdown al hacer click fuera del contenedor
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setShowFilter(false)
        }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Función para buscar por nombre con 500ms de debounce
    const debouncedSearch = debounce((name: string) => {
        if(name.trim()){
            searchByName(name.trim())
        }else{
            fetchSuppliers()
        }
    }, 500)

    // Manejar cambios en el input de búsqueda
    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        dispatch({type: 'filter-name', payload: {name: value}})
        debouncedSearch(value)
    }

    // Manejar cambios en el select de tipo de proveedor
    const handleTypeChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedType(value ? Number(value) : "")
        if (value && Number(value) !== 0) {
          searchByType(Number(value)) // Filtrar por tipo seleccionado
        } else {
          fetchSuppliers() // Restaurar lista completa si no hay filtro
        }
        setShowFilter(false) // Cerrar dropdown en móviles al seleccionar
    }

    return (
        <div className="main__searchbar">

            {/** INPUT PARA BUSQUEDA CON NOMBRE */}
                <input 
                    type="text" 
                    placeholder="Buscar por nombre..."
                    value={state.currentName}
                    onChange={handleSearch} 
                    className="search__name"              
                />

            {/** CONTENEDOR DEL FILTRO POR TIPO */}
            <div ref={filterRef} className="filter-container">
                <IoFilterCircleSharp className="search__type--icon" onClick={() => setShowFilter(!showFilter)}/>

                {/** SELECT VISIBLE TABLET Y ESCRITORIO*/}
                <select className="search__type--desktop" onChange={handleTypeChange} value={selectedType|| 0}>
                    <option value={0}>--- Seleccione una opción ---</option>
                    {state.supplierType.map(type => (
                        <option key={type.id_type} value={type.id_type}>{type.supplier_type}</option>
                    ))}
                </select>

                {showFilter && (
                /** DROPDOWN VISIBLE EN TELEFONOS */
                <div className="mobile-dropdown">
                    <select className="search__type--mobile" onChange={handleTypeChange} value={selectedType || 0}>
                        <option value={0}>--</option>
                        {state.supplierType.map(type => (
                            <option key={type.id_type} value={type.id_type}>{type.supplier_type}</option>
                        ))}
                    </select>
                </div>
                )}
            </div>
        </div>
    )
}
