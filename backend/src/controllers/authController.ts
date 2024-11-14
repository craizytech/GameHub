import { Request, Response } from "express";
import { createUser, createToken } from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { code, message } = await createUser(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { code, token } = await createToken(req.body)
        res.status(code).json({token})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}
