import { useEffect, useRef, useState } from "react"
import { useSupplier } from "../hooks/useSupplier"
import type { SupplierDB, supplierType } from "../types/types"
import { fieldValidation } from "../helpers/fieldValidation"

type SuppliersFormProps = {
  onClose: () => void
}

export default function SuppliersForm({ onClose }: SuppliersFormProps) {
    const formRef = useRef<HTMLDivElement>(null)
    const { state, addSupplier, updateSupplier, dispatch} = useSupplier()

    // Si editingId es null => agregar, si tiene valor => editar
    const isEditing = state.editingId !== null

    // Obtener el proveedor que se va a editar
    const supplierToEdit = state.suppliers.find(s => s.id_supplier === state.editingId)

    //Creamos el estado y omitimos campos que no se llenaran en el formulario
    const [formData, setFormData] = useState<Omit<SupplierDB, 'id_supplier' | 'created_at'>>({ 
        company_name: '',
        contact_person: '',
        email: '',
        id_type: 0,
        NIT: '',
        phone: '',
        city: ''
    })

    //Cargar datos cuando cambia el proveedor a actualizar
    useEffect(() => {
        if (isEditing && supplierToEdit) {
            setFormData({
                company_name: supplierToEdit.company_name,
                contact_person: supplierToEdit.contact_person,
                email: supplierToEdit.email,
                id_type: supplierToEdit.id_type,
                NIT: supplierToEdit.NIT,
                phone: supplierToEdit.phone,
                city: supplierToEdit.city
            })
        } 
    }, [isEditing, supplierToEdit])
    
    // Cerrar formulario si se hace click fuera del formulario
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            onClose()
        }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    // Mostrar mensaje por 4 segundos
    useEffect(() => {
        if(state.message){
            const timer = setTimeout(() => {
                dispatch({ type: 'clear-message' })
                // Cerrar modal solo si es éxito
                if(state.message?.type === 'success'){
                    onClose()
                }
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [state.message, dispatch, onClose])


    // Manejar cambios en inputs y select
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: name === 'id_type' ? Number(value) : value
        }))
    }

    //Insertar datos a la base de datos al darle click al boton en el formulario
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        //Validar si todos los campos estan llenos, si no detiene la ejecucion
        if(!fieldValidation()){
            return
        }

        try {
            //Actualizar un proveedor
            if(isEditing && state.editingId && supplierToEdit){ //Validar si existe un ID
                await updateSupplier(state.editingId, {
                    ...formData, //Trae los datos que estan en el estado
                    created_at: supplierToEdit.created_at //Mantiene la fecha de creación
                })
            }else{
                //Agregar nuevo proveedor
                const newSupplier: Omit<SupplierDB, 'id_supplier'> = { //Omitimos el campo id_supplier ya que este se ingresa automaticamente
                    ...formData, 
                    created_at: new Date().toISOString().split('T')[0] //La fecha se pasa automaticamente
                }
                await addSupplier(newSupplier)
                // cerrar form y limpiar campos
                setFormData({
                    company_name: '',
                    contact_person: '',
                    email: '',
                    id_type: 0,
                    NIT: '',
                    phone: '',
                    city: ''
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="form-overlay">
        <div ref={formRef} className="form-modal">
            <h2>{isEditing ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>

            {/** FORMULARIO PROVEEDORES */}
            <form onSubmit={handleSubmit}>

                {/** CAMPO NOMBRE COMPAÑIA */}
                <div className="form__content">
                    <label htmlFor="company_name">Nombre de la compañía</label>
                    <input 
                        type="text" 
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                    />
                    <div className="error" id="error-company_name"></div>
                </div>

                {/** CAMPO PERSONA DE CONTACTO */}
                <div className="form__content">
                    <label htmlFor="contact_person">Persona de Contacto</label>
                    <input 
                        type="text" 
                        id="contact_person"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}  
                    />
                    <div className="error" id="error-contact_person"></div>
                </div>
                
                {/** CAMPO CORREO ELECTRONICO */}
                <div className="form__content">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div className="error" id="error-email"></div>
                </div>

                {/** CAMPO TIPO DE PROVEEDOR */}
                <div className="form__content">
                    <label htmlFor="id_type">Tipo de Proveedor</label>
                    <select name="id_type" id="id_type" value={formData.id_type} onChange={handleChange} >
                        <option value={0}>--- Seleccione una opción ---</option>
                        {state.supplierType.map((type: supplierType) => (
                            <option key={type.id_type} value={type.id_type ?? ''}>{type.supplier_type}</option>
                        ))}
                    </select>
                    <div className="error" id="error-id_type"></div>
                </div>
                
                {/** CAMPO NIT */}
                <div className="form__content">
                    <label htmlFor="NIT">NIT</label>
                    <input 
                        type="text" 
                        id="NIT"
                        name="NIT"
                        value={formData.NIT}
                        onChange={handleChange}
                    />
                    <div className="error" id="error-NIT"></div>
                </div>

                {/** CAMPO NÚMERO DE TELÉFONO */}
                <div className="form__content">
                    <label htmlFor="phone">Teléfono</label>
                    <input 
                        type="phone" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <div className="error" id="error-phone"></div>
                </div>

                {/** CAMPO CIUDAD */}
                <div className="form__content">
                    <label htmlFor="city">Ciudad</label>
                    <input 
                        type="text" 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <div className="error" id="error-city"></div>
                </div>

                {state.message && (
                    <div className={`message ${state.message.type === 'success' ? 'message--success' : 'message--error'}`}>
                        {state.message.text}
                    </div>
                )}

                {/** BOTON GUARDAR / ACTUALIZAR */}
                <div>
                    <button type="submit" className="button button__register">{isEditing ? 'Actualizar' : 'Agregar'}</button>
                </div>

            </form>
        </div>
        </div>
    )
}
