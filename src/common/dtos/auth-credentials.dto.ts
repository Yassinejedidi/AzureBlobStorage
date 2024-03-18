import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{

    
    @IsEmail()
   email:string;

   @IsString()
   @MinLength(4)
   @MaxLength(20)
  
   password: string;
  

}