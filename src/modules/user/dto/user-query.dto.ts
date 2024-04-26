import { Transform, Type }                                   from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';

import { UserEntity } from '../entities/user.entity';

export class UserQueryDto implements Partial<UserEntity> {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  cognito_id?: string;

  @IsString()
  @Length(3, 18)
  @IsOptional()
  rut?: string;

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
