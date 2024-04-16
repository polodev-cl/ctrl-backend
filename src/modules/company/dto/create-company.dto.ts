import { IsBoolean, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Expose, Type }                                   from 'class-transformer';

import { CompanyEntity } from '../entities/company.entity';

export class CreateCompanyDto implements Partial<CompanyEntity> {
  @IsString()
  @Length(3, 10)
  rut!: string;

  @IsString()
  @Length(3, 255)
  razonSocial!: string;

  @IsString()
  @Length(3, 50)
  nombreCorto!: string;

  @IsString()
  @Length(3, 255)
  giro!: string;

  @IsString()
  @Length(3, 255)
  domicilio!: string;

  @IsString()
  @Length(3, 50)
  comuna!: string;

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
  prestador!: boolean;
}
