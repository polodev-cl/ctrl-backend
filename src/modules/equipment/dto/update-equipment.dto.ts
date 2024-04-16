import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Length, IsNumber } from "class-validator";

import { EquipmentEntity } from "../entities/equipment.entity";

export class UpdateEquipmentDto implements Partial<EquipmentEntity> {
  @IsNumber()
  @IsOptional()
  estado?: number;

  @IsDate()
  @IsOptional()
  fechaIngreso?: Date;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  ordenCompra?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  rut?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  ageId?: number;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  ageNemonico?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  ageDpc?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  inventario?: number;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  tipo?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  sistemaOperativo?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  sistemaOperativoVersion?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  uso?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  marca?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  modelo?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  mac?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  ip?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  nombre?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  procesador?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  ramGb?: number;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  disco?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  ddllTbk?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  serie?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  encargadoAgencia?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  ubicacion?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  garantiaMeses?: number;

  @IsNumber()
  @IsOptional()
  idCreacionId?: number;

  @IsNumber()
  @IsOptional()
  idModificacionId?: number;
}
