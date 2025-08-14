import * as mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'

dotenv.config() // Carga las variables de entorno desde .env

// Crear un pool de conexiones para optimizar consultas a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,        // Servidor de la base de datos
    user: process.env.DB_USER,        // Usuario con permisos
    password: process.env.DB_PASS,    // Contraseña del usuario
    database: process.env.DB_NAME,    // Base de datos a utilizar
    waitForConnections: true,         // Espera si no hay conexiones disponibles
    connectionLimit: 20,              // Máximo de conexiones simultáneas
    queueLimit: 0                     // Sin límite de cola
})

export default pool // Exporta el pool para usarlo en otras partes del proyecto