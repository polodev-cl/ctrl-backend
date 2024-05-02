import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }                                                     from '@nestjs/typeorm';

import { FindOptionsWhere }         from 'typeorm/find-options/FindOptionsWhere';
import { Equal, ILike, Repository } from 'typeorm';

import { CompanyEntity }    from '@modules/company/entities/company.entity';
import { CompanyQueryDto }  from '@modules/company/dto/company-query.dto';
import { CreateCompanyDto } from '@modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EquipmentService } from '@modules/equipment/equipment.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity) private readonly _companyRepository: Repository<CompanyEntity>,
    @Inject(forwardRef(() => EquipmentService)) private readonly equipmentService: EquipmentService
  ) {}

  public async list(queryParams?: CompanyQueryDto) {
    const whereFilter: FindOptionsWhere<CompanyEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${queryParams[key]}%`);
      return acc;
    }, {});

    if (queryParams.prestador !== undefined) whereFilter["prestador"] = Equal(queryParams.prestador);
    if (queryParams.activo !== undefined) whereFilter["activo"] = Equal(queryParams.activo);
    if (queryParams.id) whereFilter["id"] = Equal(queryParams.id);

    console.log(whereFilter);

    return await this._companyRepository.find({ where: whereFilter });
  }

  public async listBy(params: any) {
    return await this._companyRepository.findBy(params);
  }

  public async findById(id: number) {
    const company = await this._companyRepository.findOne({where: {id}});

    if (!company) throw new NotFoundException('EMPRESA_NO_ENCONTRADA');

    return company;
  }

  public async create(createCompanyDto: CreateCompanyDto) {
    return await this._companyRepository.save(createCompanyDto);
  }

  public async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this._companyRepository.update(id, updateCompanyDto);
  }

  public async delete(id: number) {
    if (await this.equipmentService.companyHaveEquipmentCount(id)) throw new ConflictException('COMPANY_HAVE_EQUIPMENT');
    return await this._companyRepository.softDelete(id);
  }
}
