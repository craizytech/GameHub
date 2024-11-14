import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface DecodedToken {
    userId: number;
}

// Check if the enviroment variables are defined.
if (!JWT_SECRET_KEY) {
    throw new Error("jwt's are not defined in the env yet.")
}
// Function to generate a JWT token
export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '1d' })
}

// Function to verify the JWT Token
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY) as DecodedToken;
    } catch (error: any) {
        throw new Error('Invalid token')
    }
}
