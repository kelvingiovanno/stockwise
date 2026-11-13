import { Request } from "express";
import { AuthUser } from "./auth-user.type.js";

export interface AuthRequest extends Request {
    user: AuthUser,
}
