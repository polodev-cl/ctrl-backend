import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Length, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

import { UserEntity } from "../entities/user.entity";

export class UserQueryDto implements Partial<UserEntity> {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  cognito_id?: string;

  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? undefined : value === "true"))
  @IsOptional()
  activo?: boolean;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  email?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  contrasena?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  nombres?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  apellidos?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  usuarioCreacionId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  usuarioModificacionId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  rolId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  empresaId?: number;
}
