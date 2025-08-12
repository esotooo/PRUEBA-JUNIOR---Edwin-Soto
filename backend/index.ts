import * as express from 'express'
import * as cors from 'cors'
import loginRoutes from './queries/login'
import suppliersRoutes from './queries/suppliers'


const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())

//Usa router de login con prefijo '/api'
app.use('/api', loginRoutes)

//Usa router de login con prefijo '/api'
app.use('/api', suppliersRoutes)


app.listen(PORT, () => {
    console.log(`Application running in port http://localhost:${PORT}`)
})