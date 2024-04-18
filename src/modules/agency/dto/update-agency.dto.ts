import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Type }                                              from 'class-transformer';
import { AgencyEntity }                                      from '../entities/agency.entity';


export class UpdateAgencyDto implements Partial<AgencyEntity> {

  @IsString()
  @Length(3, 255)
  @IsOptional()
  nombre?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  nemonico?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  comuna?: string;

  @IsNumber()
  @IsOptional()
  dpc?: number;

  @IsNumber()
  @IsOptional()
  empId?: number;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  activo?: boolean;
}
