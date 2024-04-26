import { IsNumber, IsString, Length } from 'class-validator';

import { AgencyEntity } from '../entities/agency.entity';
import { Transform }    from 'class-transformer';

export class CreateAgencyDto implements Partial<AgencyEntity> {
  @IsString()
  @Length(3, 255)
  @Transform(({value}) => value.toUpperCase())
  nombre!: string;

  @IsString()
  @Transform(({value}) => value.toUpperCase())
  @Length(3, 255)
  nemonico!: string;

  @IsNumber()
  dpc!: number;

  @IsNumber()
  empId!: number;
}
