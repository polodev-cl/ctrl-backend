import { IsBoolean, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Transform, Type }                                from 'class-transformer';

import { CompanyEntity }                               from '../entities/company.entity';
import { IS_BOOLEAN, IS_STRING, IS_URL, LENGTH_FIELD } from '../../../common/constants';

export class CreateCompanyDto implements Partial<CompanyEntity> {
  @IsString({message: IS_STRING('rut')})
  @Length(3, 10, {message: LENGTH_FIELD('rut', 3, 10)})
  rut!: string;

  @IsString({message: IS_STRING('razonSocial')})
  @Length(3, 255, {message: LENGTH_FIELD('razón social', 3, 255)})
  @Transform(({value}) => value.toUpperCase())
  razonSocial!: string;

  @IsString({message: IS_STRING('nombreCorto')})
  @Length(3, 50, {message: LENGTH_FIELD('nombre corto', 3, 50)})
  @Transform(({value}) => value.toUpperCase())
  nombreCorto!: string;

  @IsString({message: IS_STRING('giro')})
  @Length(3, 255, {message: LENGTH_FIELD('giro', 3, 255)})
  @Transform(({value}) => value.toUpperCase())
  giro!: string;

  @IsString({message: IS_STRING('domicilio')})
  @Length(3, 255, {message: LENGTH_FIELD('domicilio', 3, 255)})
  domicilio!: string;

  @IsString({message: IS_STRING('comuna')})
  @Length(3, 50, {message: LENGTH_FIELD('comuna', 3, 50)})
  comuna!: string;

  @IsString({message: IS_STRING('sitioWeb')})
  @IsUrl({}, {message: IS_URL('sitioWeb')})
  @Length(3, 255, {message: LENGTH_FIELD('sitio web', 3, 255)})
  @IsOptional()
  sitioWeb?: string;

  @IsString({message: IS_STRING('email')})
  @Length(3, 255, {message: LENGTH_FIELD('email', 3, 255)})
  @IsOptional()
  observaciones?: string;

  @IsBoolean({message: IS_BOOLEAN('prestador')})
  @Type(() => Boolean)
  prestador!: boolean;
}
