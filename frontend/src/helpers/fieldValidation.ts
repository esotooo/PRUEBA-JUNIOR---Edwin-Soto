// Función para validar campos obligatorios en un formulario
// Retorna true si todos los campos tienen valor, false si alguno está vacío
export function fieldValidation(): boolean {
    let isValid = true

    // Lista de campos a validar con sus IDs y tipos
    const fields = [
        {id: 'company_name', type: 'input'},
        {id: 'contact_person', type: 'input'},
        {id: 'email', type: 'input'},
        {id: 'id_type', type: 'select'},
        {id: 'NIT', type: 'input'},
        {id: 'phone', type: 'input'},
        {id: 'city', type: 'input'}
    ]

    fields.forEach(({id}) => {
        const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement
        const error = document.getElementById(`error-${id}`) as HTMLDivElement

        // Limpiar mensaje de error automáticamente después de 4 segundos
        setTimeout(() => {
            error.textContent = ''
        }, 4000)

        // Validar que el campo no esté vacío o solo con espacios
        if (!element.value || element.value.trim() === '') {
            error.textContent = '* Este campo es obligatorio'
            isValid = false
        }
    })

    return isValid
}
