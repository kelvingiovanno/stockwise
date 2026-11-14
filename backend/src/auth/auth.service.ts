import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from './types/auth-user.type.js';
import { AuthPayload } from './types/auth-payload.type.js';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(username: string, password: string): Promise<AuthUser> {
        const user = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!user || user.password !== password)
            throw new UnauthorizedException();

        const payload: AuthPayload = {
            sub: user.id,
            name: user.name,
            username: user.username,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: Number(
                this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRES_IN'),
            ),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: Number(
                this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
            ),
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
