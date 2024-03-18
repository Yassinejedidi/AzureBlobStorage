import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SingCredentialsDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
  }
  