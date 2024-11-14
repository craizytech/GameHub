import { registerUser, loginUser } from "../controllers/authController";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

export default authRouter;
