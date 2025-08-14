export function fieldValidation() : boolean {
    let isValid = true

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

        setTimeout(() => {
            error.textContent = ''
        }, 4000)

        if(!element.value || element.value.trim() === ''){
            error.textContent = '* Este campo es obligatorio'
            isValid = false
        }
    })
    return isValid
}