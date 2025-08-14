import { useEffect, useRef, useState } from "react"
import { useSupplier } from "../hooks/useSupplier"
import type { SupplierDB, supplierType } from "../types/types"
import { fieldValidation } from "../helpers/fieldValidation"

type SuppliersFormProps = {
  onClose: () => void
}

// Componente de formulario para agregar o editar proveedores
// Permite manejar tanto creación como actualización de registros
export default function SuppliersForm({ onClose }: SuppliersFormProps) {
    const formRef = useRef<HTMLDivElement>(null)
    const { state, addSupplier, updateSupplier, dispatch} = useSupplier()

    // Determina si estamos editando un proveedor existente
    const isEditing = state.editingId !== null
    const supplierToEdit = state.suppliers.find(s => s.id_supplier === state.editingId)

    // Estado del formulario, excluyendo campos generados automáticamente
    const [formData, setFormData] = useState<Omit<SupplierDB, 'id_supplier' | 'created_at'>>({ 
        company_name: '',
        contact_person: '',
        email: '',
        id_type: 0,
        NIT: '',
        phone: '',
        city: ''
    })

    // Cargar datos del proveedor seleccionado cuando cambia editingId
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
    
    // Cerrar el formulario si se hace click fuera del modal
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

    // Mostrar mensaje temporal y cerrar modal si la acción fue exitosa
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

    // Maneja cambios en inputs y select, actualizando el estado del formulario
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: name === 'id_type' ? Number(value) : value
        }))
    }

    // Envío del formulario: validar, agregar o actualizar proveedor
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        // Validar campos obligatorios
        if(!fieldValidation()){
            return
        }

        try {
            if(isEditing && state.editingId && supplierToEdit){ 
                // Actualizar proveedor existente
                await updateSupplier(state.editingId, {
                    ...formData, 
                    created_at: supplierToEdit.created_at // Mantener fecha original
                })
            }else{
                // Agregar nuevo proveedor
                const newSupplier: Omit<SupplierDB, 'id_supplier'> = { //Omitimos el campo id_supplier ya que este se ingresa automaticamente
                    ...formData, 
                    created_at: new Date().toISOString().split('T')[0] // Fecha actual automática
                }
                await addSupplier(newSupplier)
                // Limpiar formulario después de agregar
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

                {/** MENSAJE DE EXITO / ERROR */}
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
