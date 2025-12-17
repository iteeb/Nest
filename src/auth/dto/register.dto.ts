import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserRole } from 'src/enums/role.enum';

export class RegisterDto {
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsNotEmpty({ message: 'Username ne doit pas être vide' })
  username: string;

  @IsNotEmpty({ message: 'Password ne doit pas être vide' })
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
