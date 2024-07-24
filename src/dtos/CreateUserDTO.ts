import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Length(5, 50)
  name!: string;

  @IsNotEmpty()
  @Length(8, 100)
  password!: string;

  /* constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  } */

  
}
