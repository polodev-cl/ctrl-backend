import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgencyEntity } from "./entities/agency.entity";
import { Equal, FindOptionsWhere, ILike, Repository } from "typeorm";
import { AgencyQueryDto } from "./dto/agency-query.dto";
import { CreateAgencyDto } from "./dto/create-agency.dto";
import { UpdateAgencyDto } from "./dto/update-agency.dto";

@Injectable()
export class AgencyService {
  constructor(@InjectRepository(AgencyEntity) private readonly _agencyRepository: Repository<AgencyEntity>) {}

  public async list(queryParams?: AgencyQueryDto) {
    const whereFilter: FindOptionsWhere<AgencyEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${queryParams[key]}%`);
      return acc;
    }, {});

    if (queryParams.activo !== undefined) whereFilter["activo"] = Equal(queryParams.activo);
    if (queryParams.id) whereFilter["id"] = Equal(queryParams.id);

    console.log(whereFilter);

    return await this._agencyRepository.find({ where: whereFilter });
  }

  public async create(createCompanyDto: CreateAgencyDto) {
    return await this._agencyRepository.save(createCompanyDto);
  }

  public async update(id: number, updateCompanyDto: UpdateAgencyDto) {
    return await this._agencyRepository.update(id, updateCompanyDto);
  }

  public async delete(id: number) {
    return await this._agencyRepository.softDelete(id);
  }
}
