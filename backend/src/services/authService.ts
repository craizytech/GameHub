import { PrismaClient, User } from "@prisma/client";
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginUser } from "../types/user";
import { generateToken } from "../utils/jwtUtils";

const prisma = new PrismaClient();

export const createUser = async (user: User) => {
    const {
        username,
        email,
        passwordHash,
        updatedAt,
    } = user;

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (userExists) {
            return {
                code: 400,
                message: 'User already Exists'
            }
        }

        const password = await bycrypt.hash(passwordHash, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash: password,
                updatedAt: new Date(),
            }
        });

        return {
            code: 200,
            message: "User Registered successfully"
        }

    } catch (error: any) {
        return {
            code: 500,
            message: error.message
        }
    }
}

export const createToken = async (user: LoginUser) => {
    const { email, passwordHash } = user;

    try {
        // check if the user already exists first
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!userExists) {
            return {
                code: 400,
                message: 'User does not exist'
            }
        }

        const passwordsMatch: boolean = await bycrypt.compare(passwordHash, userExists.passwordHash);

        if (!passwordsMatch) {
            return {
                code: 400,
                message: "Invalid email or password"
            }
        }

        const token = generateToken(userExists.user_id);

        return {
            code: 200,
            token,
        }
    } catch (error: any) {
        return {
            code: 500,
            message: `An error occured: ${error.message}`
        }
    }
}
