import { IsBoolean, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Transform, Type }                                from 'class-transformer';

import { CompanyEntity } from '../entities/company.entity';

export class CreateCompanyDto implements Partial<CompanyEntity> {
  @IsString()
  @Length(3, 10)
  rut!: string;

  @IsString()
  @Length(3, 255)
  @Transform(({value}) => value.toUpperCase())
  razonSocial!: string;

  @IsString()
  @Length(3, 50)
  @Transform(({value}) => value.toUpperCase())
  nombreCorto!: string;

  @IsString()
  @Length(3, 255)
  @Transform(({value}) => value.toUpperCase())
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
