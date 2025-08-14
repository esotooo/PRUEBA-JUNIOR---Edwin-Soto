import pool from '../db/connection' 
import bcrypt from 'bcrypt'
import { HashPassword } from '../types/types'


// Función que recibe un correo y una contraseña en texto plano
// La encripta y actualiza el usuario correspondiente en la base de datos
async function hashPassword({email, plainPassword} : HashPassword) {
  try {
    const saltRounds = 5 // Número de rondas de hash para bcrypt
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds) // Generar hash seguro

    const query = 'UPDATE users SET pass = ? WHERE email = ?' 
    await pool.query(query, [hashedPassword, email]) // Actualiza la contraseña en la DB

    console.log(`Password for ${email} updated successfully.`)
    process.exit(0) // Salida exitosa del script

  } catch (error) {
    process.exit(1) // Salida con error en caso de fallo
  }
}

// Datos del usuario a actualizar
const emailToUpdate = 'admin@kratt.com'
const newPlainPassword = 'admin2025'

// Ejecuta la función
hashPassword({ email: emailToUpdate, plainPassword: newPlainPassword });
