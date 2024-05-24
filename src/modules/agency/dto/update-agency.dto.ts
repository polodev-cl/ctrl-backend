import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Transform, Type }                                   from 'class-transformer';
import { AgencyEntity }                                      from '../entities/agency.entity';
import { IS_BOOLEAN, IS_NUMBER, IS_STRING, LENGTH_FIELD }    from '../../../common/constants';


export class UpdateAgencyDto implements Partial<AgencyEntity> {

  @IsString({message: IS_STRING('nombre')})
  @Length(3, 255, {message: LENGTH_FIELD(3, 255)})
  @Transform(({value}) => value.toUpperCase())
  @IsOptional()
  nombre?: string;

  @IsString({message: IS_STRING('nemonico')})
  @Length(3, 50, {message: LENGTH_FIELD(3, 50)})
  @Transform(({value}) => value.toUpperCase())
  @IsOptional()
  nemonico?: string;

  @IsString({message: IS_STRING('comuna')})
  @Length(3, 50, {message: LENGTH_FIELD(3, 50)})
  @IsOptional()
  comuna?: string;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('dpc')})
  @IsOptional()
  dpc?: number;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: IS_NUMBER('empId')})
  @IsOptional()
  empId?: number;

  @IsBoolean({message: IS_BOOLEAN('activo')})
  @Type(() => Boolean)
  @IsOptional()
  activo?: boolean;
}
