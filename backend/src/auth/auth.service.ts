import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto.js';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {

        const user = await this.userService.findByUsername(username);

        if(user && user.password === password) return user;
    
        return null;
    
    }

    async login(user: any) {
        
        const payload = { username: user.username, sub: user.userId };
        
        return {
            access_token: this.jwtService.sign(payload),
        };

    }

}
