import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto.js';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from './types/auth-user.type.js';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(username: string, password: string) : Promise<AuthUser> {
        
        const user = await this.userService.findByUsername(username);

        if (!user || user.password !== password) throw new UnauthorizedException();

        const payload = { 
            sub: user.id,
            name: user.name,
            username: user.username,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN'),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN'),
        });

        return {
            accessToken,
            refreshToken, 
            id: user.id,
            name: user.name,
            username: user.username,
        };

    }

}
