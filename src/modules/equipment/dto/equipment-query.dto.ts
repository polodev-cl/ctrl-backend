import { Transform, Type }                                        from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { EquipmentEntity }                                        from '../entities/equipment.entity';
import { EquipmentUseEnum }                                       from '@modules/equipment/enums/equipment-use.enum';
import { EquipmentDiskTypeEnum }                                  from '@modules/equipment/enums/equipment-disk-type.enum';

export class EquipmentQueryDto implements Partial<EquipmentEntity> {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  estado?: number;

  @IsDate()
  @Transform(({value}) => new Date(value))
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
  agenciaId?: number;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  agenciaMnemonic?: string;

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
  @IsOptional()
  tipo?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  sistemaOperativo?: string;

  @IsEnum(EquipmentUseEnum)
  @IsOptional()
  uso?: EquipmentUseEnum;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  marca?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  modelo?: string;

  @IsString()
  @Length(0, 50)
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
