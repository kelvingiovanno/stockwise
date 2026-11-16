import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(6)
    name: string;

    @IsString()
    @MinLength(6)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;
}
