import pool from '../db/connection' 
import * as bcrypt from 'bcrypt'

// Funcion para hashear la contraseña en la DB
async function hashPassword(email, plainPassword) {
  try {
    const saltRounds = 5
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)

    const query = 'UPDATE users SET pass = ? WHERE email = ?'
    await pool.query(query, [hashedPassword, email])

    console.log(`Password for ${email} updated successfully.`)
    process.exit(0)

  } catch (error) {
    process.exit(1)
  }
}

const emailToUpdate = 'admin@kratt.com'
const newPlainPassword = 'admin2025'

hashPassword(emailToUpdate, newPlainPassword)
