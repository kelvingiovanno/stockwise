import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../../generated/prisma/enums.js";
import { USER_ROLE_KEY } from "../decorators/user-roles.decorators.js";
import { AuthRequest } from "../../auth/types/auth-request.type.js";

@Injectable()
export class SystemRolesGuard implements CanActivate {
    
    constructor(private readonly reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            USER_ROLE_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );

        const request: AuthRequest = context.switchToHttp().getRequest();

        const user = request.user;

        if (!user) throw new UnauthorizedException()

        return requiredRoles.some((role) => role === user.role);

    }

}