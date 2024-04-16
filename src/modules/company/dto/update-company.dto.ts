import { IsBoolean, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Expose, Type }                                   from 'class-transformer';

import { CompanyEntity } from '../entities/company.entity';

export class UpdateCompanyDto implements Partial<CompanyEntity> {

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
  @Length(3, 255)
  @IsOptional()
  domicilio?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  comuna?: string;

  @IsString()
  @IsUrl()
  @Length(3, 255)
  @IsOptional()
  sitioWeb?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  observaciones?: string;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  prestador?: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  activo?: boolean;
}
