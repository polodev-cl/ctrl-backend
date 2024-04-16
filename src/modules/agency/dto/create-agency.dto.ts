import { IsString, Length, IsNumber } from "class-validator";

import { AgencyEntity } from "../entities/agency.entity";

export class CreateAgencyDto implements Partial<AgencyEntity> {
  @IsString()
  @Length(3, 255)
  nombre!: string;

  @IsString()
  @Length(3, 255)
  nemonico!: string;

  @IsNumber()
  dpc!: number;

  @IsNumber()
  empId!: number;
}
