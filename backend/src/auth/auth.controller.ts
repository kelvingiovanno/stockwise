import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { HttpAdapterHost } from '@nestjs/core';
import type { AuthRequest } from './types/auth-request.type.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly adapterHost: HttpAdapterHost) {}

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Req() req: AuthRequest,
        @Res({ passthrough: true }) res: unknown,
    ) {
        this.adapterHost.httpAdapter.setCookie(
            res,
            'refresh-token',
            req.user.refreshToken,
            {
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
            },
        );

        return {
            status: 'success',
            message: 'Login succesful',
            data: {
                id: req.user.id,
                name: req.user.name,
                username: req.user.username,
                access_token: req.user.accessToken,
            },
        };
    }
}
