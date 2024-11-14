import express ,{ Express, Request, Response } from "express";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, AuthRequest } from "./middleware/authMiddleware";

// import Routers
import authRouter from "./routers/authRouter";


config();

const PORT: number = Number(process.env.PORT) || 5000

const app: Express = express();

// global middlewares
app.use(express.json());

// registering all routers below
app.use('/auth', authRouter);


// General routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: "Gamehub API is LIVE!"});
})

const prisma = new PrismaClient();

app.get('/users',authenticateToken , async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
