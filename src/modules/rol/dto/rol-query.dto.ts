import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Type }                                   from 'class-transformer';

import { RolEntity } from '@modules/rol/entities/rol.entity';

export class RolQueryDto implements Partial<RolEntity> {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  nombre?: string;
}
