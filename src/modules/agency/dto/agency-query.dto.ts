import { IsBoolean, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Expose, Transform, Type } from "class-transformer";

import { AgencyEntity } from "@modules/agency/entities/agency.entity";
import { CompanyEntity } from "@modules/company/entities/company.entity";
import { ManyToOne } from "typeorm";

export class AgencyQueryDto implements Partial<AgencyEntity> {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;
  
  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? undefined : value === "true"))
  @IsOptional()
  activo?: boolean;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  nombre?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  nemonico?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  dpc?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  empId?: number;

  @ManyToOne(() => CompanyEntity)
  empresa?: CompanyEntity;


}
