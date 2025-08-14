import { Response } from 'express'

// Manejador centralizado para errores del servidor
// Envía un mensaje genérico al cliente y registra el error en la consola
export const handleServerError = (res: Response, error: any) => {
    console.error(error) // Loguea el error para depuración
    res.status(500).json({ success: false, message: 'Internal server error' }) // Mensaje genérico para el cliente
}