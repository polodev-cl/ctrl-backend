import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Transform, Type }                                   from 'class-transformer';

import { CompanyEntity }                                  from '../entities/company.entity';
import { IS_BOOLEAN, IS_NUMBER, IS_STRING, LENGTH_FIELD } from '../../../common/constants';

export class CompanyQueryDto implements Partial<CompanyEntity> {
  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('id')})
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString({message: IS_STRING('rut')})
  @Length(3, 10, {message: LENGTH_FIELD('rut', 3, 10)})
  @IsOptional()
  rut?: string;

  @IsString({message: IS_STRING('razonSocial')})
  @Length(3, 255, {message: LENGTH_FIELD('razón social', 3, 255)})
  @IsOptional()
  razonSocial?: string;

  @IsString({message: IS_STRING('nombreCorto')})
  @Length(3, 50, {message: LENGTH_FIELD('nombre corto', 3, 50)})
  @IsOptional()
  nombreCorto?: string;

  @IsString({message: IS_STRING('giro')})
  @Length(3, 255, {message: LENGTH_FIELD('giro', 3, 255)})
  @IsOptional()
  giro?: string;

  @IsString({message: IS_STRING('direccion')})
  @Length(3, 50, {message: LENGTH_FIELD('dirección', 3, 50)})
  @IsOptional()
  comuna?: string;

  @IsBoolean({message: IS_BOOLEAN('prestador')})
  @Transform(({value}) => value === undefined ? undefined : value === 'true')
  @IsOptional()
  prestador?: boolean;

  @IsBoolean({message: IS_BOOLEAN('activo')})
  @Transform(({value}) => value === undefined ? undefined : value === 'true')
  @IsOptional()
  activo?: boolean;
}
