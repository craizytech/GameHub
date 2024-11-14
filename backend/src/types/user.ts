import { User } from "@prisma/client";

export type LoginUser = Pick<User, "email" | "passwordHash">;
