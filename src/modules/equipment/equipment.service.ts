import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }                                                     from '@nestjs/typeorm';

import { Equal, FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { AgencyService }                                  from '@modules/agency/agency.service';
import { CompanyService }                                 from '@modules/company/company.service';
import { EquipmentHistoryEntity }                         from '@modules/equipment/entities/equipment-history.entity';
import { CreateMassiveDto }                               from '@modules/equipment/dto/create-massive.dto';
import { IEquipment }                                     from '@modules/equipment/interfaces/equipment.interface';

import { EquipmentEntity }    from './entities/equipment.entity';
import { EquipmentQueryDto }  from './dto/equipment-query.dto';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { UserCompanyType }    from '../../common/decorators/company-id.decorator';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(EquipmentEntity) private readonly _equipmentRepository: Repository<EquipmentEntity>,
    @InjectRepository(EquipmentHistoryEntity) private readonly _equipmentHistoryEntityRepository: Repository<EquipmentHistoryEntity>,
    @Inject(forwardRef(() => CompanyService)) private readonly _companyService: CompanyService,
    @Inject(forwardRef(() => AgencyService)) private readonly _agencyService: AgencyService
  ) {}

  public async list(queryParams?: EquipmentQueryDto, userCompany?: UserCompanyType) {
    const whereFilter: FindOptionsWhere<EquipmentEntity> = {};

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        const value = queryParams[key];
        if (key === 'rut') {
          whereFilter[key] = ILike(`%${ value }%`);
        } else if (!isNaN(parseFloat(value))) {
          whereFilter[key] = Equal(parseFloat(value));
        } else {
          whereFilter[key] = ILike(`%${ value }%`);
        }
      }
    });

    if (queryParams.uso) whereFilter.uso = Equal(queryParams.uso);

    if (userCompany && !userCompany?.prestador) whereFilter['agencia'] = {empId: Equal(userCompany.empId)};

    return await this._equipmentRepository.find({where: whereFilter, relations: [ 'agencia', 'agencia.empresa', 'usuarioCreacion' ]});
  }

  public async getById(id: number) {
    const equipment = await this._equipmentRepository.findOne({
      where: {id},
      relations: [ 'agencia', 'agencia.empresa', 'usuarioCreacion' ]
    });

    if (!equipment) throw new NotFoundException('Equipo no encontrado');

    return equipment;
  }

  public async companyHaveEquipmentCount(empId: number) {
    const equipmentCount = await this._equipmentRepository.count({
      where: {
        agencia: {
          empId: empId
        }
      }
    });

    return equipmentCount > 0;
  }

  public async agencyHaveEquipmentCount(ageId: number) {
    const equipmentCount = await this._equipmentRepository.count({
      where: {
        agenciaId: ageId
      }
    });

    return equipmentCount > 0;
  }

  public async create(createEquipmentDto: CreateEquipmentDto) {
    const equipment = await this._equipmentRepository.findOne({
      where: [
        {inventario: createEquipmentDto.inventario},
        {mac: createEquipmentDto.mac},
        {serie: createEquipmentDto.serie}
      ]
    });

    if (equipment) throw new ConflictException('Equipo ya existe por inventario, mac o serie');

    return await this._equipmentRepository.save(createEquipmentDto);
  }

  public async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this._equipmentRepository.findOne({where: {id}});

    if (!equipment) throw new NotFoundException('Equipo no encontrado');

    return await this._equipmentRepository.save({
      id,
      ...equipment,
      ...updateEquipmentDto
    });
  }

  public async delete(id: number) {
    const count = await this._equipmentRepository.count({where: {id}});

    if (count === 0) throw new NotFoundException('Equipo no encontrado');

    return await this._equipmentRepository.softDelete(id);
  }

  public async history(id: number) {
    return await this._equipmentHistoryEntityRepository.find({where: {equipoId: id}, relations: [ 'usuario' ]});
  }

  public async validateMassiveUpload(data: CreateMassiveDto[], errors: Set<string> = new Set<string>()) {
    data.forEach((record, index) => {
      const requiredFields = [ 'empresa', 'agencia' ] as (keyof CreateMassiveDto)[];
      for (const field of requiredFields) {
        if (!record[field]) {
          errors.add(`Registro ${ index + 1 }: ${ field } es requerido`);
        }
      }
    });

    if (errors.size > 0) return errors;

    const companies = new Set();
    const agencies = new Set();

    for (let i = 0; i < data.length; i++) {
      const record = data[i];

      companies.add(record.empresa.trim());
      agencies.add(`${ record.empresa.trim() };${ record.agencia.trim() }`);
    }

    const companiesList = await this._companyService.listBy({nombreCorto: In(Array.from(companies))});
    const agenciesList = await this._agencyService.listBy({
      nombre: In(Array.from(agencies).map((item: string) => item.split(';')[1]))
    });

    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      const company = companiesList.find((item) => item.nombreCorto === record.empresa.trim());
      const agency = agenciesList
        .find((item) =>
          item.nombre === record.agencia.trim() &&
          item.empresa.nombreCorto === record.empresa.trim()
        );

      if (!company) errors.add(`Empresa ${ record.empresa } no encontrada`);
      if (!agency) errors.add(`Agencia ${ record.agencia } no encontrada`);

      data[i].company = company;
      data[i].agency = agency;
    }

    return errors;
  }

  public async massiveFindExcelDuplicates(data: IEquipment[], errors: Set<string> = new Set<string>()) {
    const inventories = new Set();
    const macs = new Set();
    const series = new Set();

    for (let i = 0; i < data.length; i++) {
      const record = data[i];

      const inventario = record.inventario !== undefined && record.inventario !== null ? record.inventario : null;
      const mac = record.mac !== undefined && record.mac !== null ? record.mac : null;
      const serie = record.serie !== undefined && record.serie !== null ? record.serie : null;

      if (inventario !== null && inventories.has(inventario)) {
          errors.add(`Registro ${i + 1}: Inventario ${inventario} ya se encuentra en el excel`);
      }
      if (mac !== null && macs.has(mac)) {
          errors.add(`Registro ${i + 1}: Mac ${mac} ya se encuentra en el excel`);
      }
      if (serie !== null && series.has(serie)) {
          errors.add(`Registro ${i + 1}: Serie ${serie} ya se encuentra en el excel`);
      }

      if (inventario !== null) inventories.add(inventario);
      if (mac !== null) macs.add(mac);
      if (serie !== null) series.add(serie);
  }

  return errors;
}

  public async massiveFindDBDuplicates(data: IEquipment[], errors: Set<string> = new Set<string>()): Promise<number[]> {
    const duplicateIndices: number[] = [];
    const inventoryMap = new Map<string, number>();
    const macMap = new Map<string, number>();
    const serieMap = new Map<string, number>();

    const dbData = await this._equipmentRepository.find({
      where: [
        {inventario: In(data.map((item) => item.inventario))},
        {mac: In(data.map((item) => item.mac))},
        {serie: In(data.map((item) => item.serie))}
      ]
    });

    dbData.forEach(record => {
      if (record.inventario) inventoryMap.set(record.inventario.toString(), (inventoryMap.get(record.inventario.toString()) || 0) + 1);
      if (record.mac) macMap.set(record.mac, (macMap.get(record.mac) || 0) + 1);
      if (record.serie) serieMap.set(record.serie, (serieMap.get(record.serie) || 0) + 1);
    });

    data.forEach((item, index) => {
      let foundDuplicate = false;
      if (item.inventario && inventoryMap.has(item.inventario.toString())) {
        errors.add(`Inventario ${ item.inventario } ya existe en la base de datos en el índice ${ index + 1 }`);
        foundDuplicate = true;
      }
      if (item.mac && macMap.has(item.mac)) {
        errors.add(`Mac ${ item.mac } ya existe en la base de datos en el índice ${ index + 1 }`);
        foundDuplicate = true;
      }
      if (item.serie && serieMap.has(item.serie)) {
        errors.add(`Serie ${ item.serie } ya existe en la base de datos en el índice ${ index + 1 }`);
        foundDuplicate = true;
      }
      if (foundDuplicate) duplicateIndices.push(index);
    });

    return duplicateIndices;
  }


  public async massiveUpload(data: IEquipment[], errorList: Set<string> = new Set<string>()) {
    // data.forEach((record) => {
    //   if (!record.ordenCompra) 
    //     record.ordenCompra = '0';
    // });
    const entities = data.map((item) => this._equipmentRepository.create(item));

    await this._equipmentRepository.save(entities);

    return {errors: errorList, completed: true};
  }
}
