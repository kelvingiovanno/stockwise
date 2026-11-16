import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { SystemRole, UserRole } from "../../generated/prisma/enums.js";
import { AuthRequest } from "../../features/auth/types/auth-request.type.js";
import { SYSTEM_ROLES_KEY } from "../decorators/system-roles.decorators.js";

@Injectable()
export class SystemRolesGuard implements CanActivate {
    
    constructor(private readonly reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requiredRoles = this.reflector.getAllAndOverride<SystemRole[]>(
            SYSTEM_ROLES_KEY,
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