import { Transform, Type }                                        from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator';

import { EquipmentEntity }       from '../entities/equipment.entity';
import { EquipmentUseEnum }      from '@modules/equipment/enums/equipment-use.enum';
import { EquipmentDiskTypeEnum } from '@modules/equipment/enums/equipment-disk-type.enum';

export class CreateEquipmentDto implements Partial<EquipmentEntity> {
  @IsNumber()
  estado!: number;

  @IsString()
  @Length(3, 50)
  ordenCompra!: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  rut?: string;

  @IsDate()
  @Transform(({value}) => new Date(value))
  @IsOptional()
  fechaIngreso?: Date;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  agenciaId?: number;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  agenciaNemonico?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  agenciaDpc?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  inventario?: number;

  @IsString()
  @Length(2, 50)
  tipo!: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  sistemaOperativo?: string;

  @IsEnum(EquipmentUseEnum)
  uso!: EquipmentUseEnum;

  @IsString()
  @Length(0, 50)
  marca!: string;

  @IsString()
  @Length(3, 50)
  modelo!: string;

  @IsString()
  @Length(12, 50)
  @IsOptional()
  mac?: string;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  ip?: string;

  @IsString()
  @Length(3, 50)
  nombre!: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  procesador?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  ramGb?: number;

  @IsEnum(EquipmentDiskTypeEnum)
  @IsOptional()
  disco?: EquipmentDiskTypeEnum;

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
  encargadoAgencia!: string;

  @IsString()
  @Length(3, 50)
  ubicacion!: string;

  @IsNumber()
  @Type(() => Number)
  garantiaMeses!: number;

  @IsNumber()
  @IsOptional()
  usuarioIdCreacion?: number;
}
