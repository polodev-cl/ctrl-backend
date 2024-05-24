import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Transform, Type }                                   from 'class-transformer';

import { AgencyEntity }                                   from '@modules/agency/entities/agency.entity';
import { CompanyEntity }                                  from '@modules/company/entities/company.entity';
import { IS_BOOLEAN, IS_NUMBER, IS_STRING, LENGTH_FIELD } from '../../../common/constants';

export class AgencyQueryDto implements Partial<AgencyEntity> {
  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('id')})
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsBoolean({message: IS_BOOLEAN})
  @Transform(({ value }) => (value === undefined ? undefined : value === "true"))
  @IsOptional()
  activo?: boolean;

  @IsString({message: IS_STRING('nombre')})
  @Length(3, 255)
  @IsOptional()
  nombre?: string;

  @IsString()
  @Length(3, 255, {message: LENGTH_FIELD(3, 255)})
  @IsOptional()
  nemonico?: string;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('dpc')})
  @Type(() => Number)
  @IsOptional()
  dpc?: number;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('empId')})
  @Type(() => Number)
  @IsOptional()
  empId?: number;

  // Internal fields, do not expose
  empresa?: CompanyEntity;
}
