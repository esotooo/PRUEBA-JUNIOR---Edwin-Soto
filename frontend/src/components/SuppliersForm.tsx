import { useEffect, useRef, useState } from "react"
import { useSupplier } from "../hooks/useSupplier"
import type { SupplierDB, supplierType } from "../types/types"

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


    const [formData, setFormData] = useState<Omit<SupplierDB, 'id_supplier' | 'created_at'>>({
        company_name: '',
        contact_person: '',
        email: '',
        id_type: 0,
        NIT: '',
        phone: '',
        city: ''
      })


    // Cerrar formulario si se hace click fuera del modal
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

    // Manejar cambios en inputs y select
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: name === 'id_type' ? Number(value) : value
        }))
      }

      async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (formData.id_type === 0) {
          alert("Selecciona un tipo de proveedor")
          return
        }
    
        // Crear objeto para enviar (añadiendo created_at con fecha actual ISO)
        const newSupplier: Omit<SupplierDB, 'id_supplier'> = {
          ...formData,
          created_at: new Date().toISOString().split('T')[0]
        }
    
        try {
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
          onClose()
        } catch (error) {
          console.error(error)
        }
      }


    return (
        <div className="form-overlay">
        <div ref={formRef} className="form-modal">
            <h2>Agregar Proveedor</h2>
            <form onSubmit={handleSubmit}>
            
                <div>
                    <label htmlFor="company_name">Nombre de la compañía</label>
                    <input 
                        type="text" 
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contact_person">Persona de Contacto</label>
                    <input 
                        type="text" 
                        id="contact_person"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="id_type">Tipo de Proveedor</label>
                    <select name="id_type" id="id_type" value={formData.id_type} onChange={handleChange} required>
                        <option value={0}>--- Seleccione una opción ---</option>
                        {state.supplierType.map((type: supplierType) => (
                            <option key={type.id_type} value={type.id_type}>{type.supplier_type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="NIT">NIT</label>
                    <input 
                        type="NIT" 
                        id="NIT"
                        name="NIT"
                        value={formData.NIT}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input 
                        type="phone" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="city">Ciudad</label>
                    <input 
                        type="city" 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                    <button type="submit">Agregar</button>
                <div>

                </div>
            </form>
        </div>
        </div>
    )
}
