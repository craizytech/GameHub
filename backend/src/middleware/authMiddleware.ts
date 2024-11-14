import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export interface AuthRequest extends Request {
    userId?: number;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction ): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({message: 'Authorization Header Missing'});
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({message: 'Token missing from Authorization Header'});
        return;
    }

    try {
        // verify the token
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({message: 'Invalid or expired token'})
        return;
    }
};
