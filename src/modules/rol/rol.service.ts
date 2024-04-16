import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolEntity } from "@modules/rol/entities/rol.entity";
import { ILike, Repository } from "typeorm";
import { RolQueryDto } from "@modules/rol/dto/rol-query.dto";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { CreateRolDto } from "@modules/rol/dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";

@Injectable()
export class RolService {
  constructor(@InjectRepository(RolEntity) private readonly _rolRepository: Repository<RolEntity>) {}

  public async list(queryParams?: RolQueryDto) {
    const whereFilter: FindOptionsWhere<RolEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${queryParams[key]}%`);
      return acc;
    }, {});

    return await this._rolRepository.find({ where: whereFilter });
  }

  public async create(createRolDto: CreateRolDto) {
    return await this._rolRepository.save(createRolDto);
  }

  public async update(id: number, updateRolDto: UpdateRolDto) {
    return await this._rolRepository.update(id, updateRolDto);
  }

  public async delete(id: number) {
    return await this._rolRepository.softDelete(id);
  }
}
