import { UserRole } from "../../generated/prisma/enums.js";

export interface AuthUser {
    accessToken: string;
    refreshToken: string;
    id: string;
    name: string;
    username: string;
    role: UserRole;
}
