import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Expose, Transform, Type }                           from 'class-transformer';

import { CompanyEntity } from '../entities/company.entity';

export class CompanyQueryDto implements Partial<CompanyEntity> {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @Length(3, 10)
  @IsOptional()
  rut?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  razonSocial?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  nombreCorto?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  giro?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  comuna?: string;

  @IsBoolean()
  @Transform(({value}) => value === undefined ? undefined : value === 'true')
  @IsOptional()
  prestador?: boolean;

  @IsBoolean()
  @Transform(({value}) => value === undefined ? undefined : value === 'true')
  @IsOptional()
  activo?: boolean;
}
