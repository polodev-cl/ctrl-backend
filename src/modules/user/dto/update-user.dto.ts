import { IsNumber, IsBoolean, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { Expose, Type } from "class-transformer";

import { UserEntity } from "../entities/user.entity";

export class UpdateUserDto implements Partial<UserEntity> {
  @IsString()
  @Length(3, 255)
  @IsOptional()
  cognito_id!: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  email!: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  contrasena!: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  nombres!: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  apellidos!: string;

  @IsNumber()
  @IsOptional()
  rolId?: number;

  @IsNumber()
  @IsOptional()
  empresaId?: number;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  activo?: boolean;
}
