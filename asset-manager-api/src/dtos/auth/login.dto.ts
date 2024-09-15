import { IsString, MinLength, MaxLength } from 'class-validator';
// login dto $env:GIT_COMMITTER_DATE = '2024-09-15T12:00:00'
export class LoginDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
} 