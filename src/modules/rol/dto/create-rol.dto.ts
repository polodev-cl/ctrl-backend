import { IsString, Length } from 'class-validator';

import { RolEntity } from '@modules/rol/entities/rol.entity';

export class CreateRolDto implements Partial<RolEntity> {
  @IsString()
  @Length(3, 50)
  nombre!: string;
}
