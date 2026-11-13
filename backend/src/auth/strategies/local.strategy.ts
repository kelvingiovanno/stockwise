import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service.js';
import { AuthUser } from '../types/auth-user.type.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<AuthUser> {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException();
        return user;
    }
    
}
