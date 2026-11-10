import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UserService) {}

    async signIn(signInDto: SignInDto) {

        const user = await this.userService.findByUsername(signInDto.username);
        
        console.log(signInDto);

        if(user! && user.password === signInDto.password) return user;
    
        throw new UnauthorizedException();
    
    }

}
