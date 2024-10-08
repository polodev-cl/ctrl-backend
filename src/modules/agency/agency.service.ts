import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }                                                     from '@nestjs/typeorm';

import { Equal, FindOptionsWhere, Repository } from 'typeorm';

import { EquipmentService } from '@modules/equipment/equipment.service';

import { getWhereFilter }  from '../../common/utils/utils';
import { AgencyEntity }    from './entities/agency.entity';
import { AgencyQueryDto }  from './dto/agency-query.dto';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(AgencyEntity) private readonly _agencyRepository: Repository<AgencyEntity>,
    @Inject(forwardRef(() => EquipmentService)) private readonly equipmentService: EquipmentService
  ) {}

  public async list(queryParams?: AgencyQueryDto) {
    const whereFilter: FindOptionsWhere<AgencyEntity> = getWhereFilter(queryParams);

    if (queryParams.activo !== undefined) whereFilter['activo'] = Equal(queryParams.activo);
    if (queryParams.id) whereFilter['id'] = Equal(queryParams.id);
    if (queryParams.empId) whereFilter['empId'] = Equal(queryParams.empId);

    return await this._agencyRepository.find({where: whereFilter, relations: [ 'empresa' ]});
  }

  public async listBy(params: any) {
    return await this._agencyRepository.find({where: params, relations: [ 'empresa' ]});
  }

  public async findById(id: number) {
    const agency = await this._agencyRepository.findOne({where: {id: id}, relations: [ 'empresa' ]});

    if (!agency) throw new NotFoundException('La agencia no existe');

    return agency;
  }

  public async create(createCompanyDto: CreateAgencyDto) {
    const count = await this._agencyRepository.count({where: {nombre: createCompanyDto.nombre, empId: createCompanyDto.empId}});

    if (count > 0) throw new ConflictException('Ya existe una agencia con el mismo nombre y empresa');

    return await this._agencyRepository.save(createCompanyDto);
  }

  public async update(id: number, updateCompanyDto: UpdateAgencyDto) {
    const agency = await this._agencyRepository.findOne({where: {id: id}});

    if (!agency) throw new NotFoundException('La agencia no existe');

    return await this._agencyRepository.save({
      id,
      ...agency,
      ...updateCompanyDto
    });
  }

  public async delete(id: number) {
    if (await this.equipmentService.agencyHaveEquipmentCount(id)) throw new ConflictException('AGENCY_HAVE_EQUIPMENT');
    return await this._agencyRepository.softDelete(id);
  }
}
