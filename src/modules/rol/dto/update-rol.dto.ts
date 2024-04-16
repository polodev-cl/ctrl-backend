import { IsOptional, IsString, Length } from "class-validator";
import { RolEntity } from "../entities/rol.entity";

export class UpdateRolDto implements Partial<RolEntity> {
  @IsString()
  @Length(3, 255)
  @IsOptional()
  nombre?: string;
}
