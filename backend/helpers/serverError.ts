import {Response} from 'express'

export const handleServerError = (res: Response, error: any) => {
    console.error(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
}