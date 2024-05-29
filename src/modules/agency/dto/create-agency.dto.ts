import { IsNumber, IsString, Length } from 'class-validator';

import { AgencyEntity }                       from '../entities/agency.entity';
import { Transform }                          from 'class-transformer';
import { IS_NUMBER, IS_STRING, LENGTH_FIELD } from '../../../common/constants';

export class CreateAgencyDto implements Partial<AgencyEntity> {
  @IsString({message: IS_STRING('nombre')})
  @Length(3, 255, {message: LENGTH_FIELD('nombre', 3, 255)})
  @Transform(({value}) => value.toUpperCase())
  nombre!: string;

  @IsString({message: IS_STRING('nemonico')})
  @Transform(({value}) => value.toUpperCase())
  @Length(3, 255, {message: LENGTH_FIELD('nemonico', 3, 255)})
  nemonico!: string;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('dpc')})
  dpc!: number;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('empId')})
  empId!: number;
}
