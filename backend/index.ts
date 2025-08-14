import express from 'express'
import cors from 'cors'
import loginRoutes from './queries/login'
import suppliersRoutes from './queries/suppliers'
import typeRoutes from './queries/supplierType'

const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())

//Usa router de inicio de sesión con prefijo '/api'
app.use('/api', loginRoutes)

//Usa router de proveedores con prefijo '/api'
app.use('/api', suppliersRoutes)

//Usa router de tipos de proveedores con prefijo '/api'
app.use('/api', typeRoutes)


app.listen(PORT, () => {
    console.log(`Application running in port http://localhost:${PORT}`)
})