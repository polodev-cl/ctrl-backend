import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

import { UserEntity } from '../entities/user.entity';

export class CreateUserDto implements Partial<UserEntity> {
  @IsString()
  @Length(3, 255)
  cognito_id!: string;

  @IsString()
  @Length(3, 18)
  rut!: string;

  @IsString()
  @Length(3, 255)
  email!: string;

  @IsString()
  @Length(3, 50)
  contrasena!: string;

  @IsString()
  @Length(3, 255)
  nombres!: string;

  @IsString()
  @Length(3, 255)
  apellidos!: string;

  @IsNumber()
  @IsOptional()
  usuarioCreacionId?: number;

  @IsNumber()
  @IsOptional()
  usuarioModificacionId?: number;

  @IsNumber()
  @IsOptional()
  rolId?: number;

  @IsNumber()
  @IsOptional()
  empresaId?: number;
}
