import { IsEmail, IsString, MinLength } from 'class-validator';
// register dto 
export class RegisterDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
} 