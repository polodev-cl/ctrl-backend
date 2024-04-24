import { Injectable }                                 from '@nestjs/common';
import { InjectRepository }                           from '@nestjs/typeorm';
import { EquipmentEntity }                            from './entities/equipment.entity';
import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { EquipmentQueryDto }                          from './dto/equipment-query.dto';
import { CreateEquipmentDto }                         from './dto/create-equipment.dto';
import { UpdateEquipmentDto }                         from './dto/update-equipment.dto';
import { EquipmentHistoryEntity }                     from '@modules/equipment/entities/equipment-history.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(EquipmentEntity) private readonly _equipmentRepository: Repository<EquipmentEntity>,
    @InjectRepository(EquipmentHistoryEntity) private readonly _equipmentHistoryEntityRepository: Repository<EquipmentHistoryEntity>
  ) {}

  public async list(queryParams?: EquipmentQueryDto) {
    const whereFilter: FindOptionsWhere<EquipmentEntity> = {};

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        const value = queryParams[key];
        if (key === 'rut') {
          whereFilter[key] = ILike(`%${ value }%`);
        } else if (key === 'uso') {
          whereFilter[key] = value;
        } else if (key === 'sistemaOperativoVersion') {
          whereFilter[key] = ILike(`%${ value }%`);
        } else if (!isNaN(parseFloat(value))) {
          whereFilter[key] = Equal(parseFloat(value));
        } else {
          whereFilter[key] = ILike(`%${ value }%`);
        }
      }
    });

    console.log(whereFilter);

    return await this._equipmentRepository.find({where: whereFilter, relations: [ 'agencia', 'agencia.empresa', 'usuarioCreacion' ]});
  }

  public async create(createEquipmentDto: CreateEquipmentDto) {
    return await this._equipmentRepository.save(createEquipmentDto);
  }

  public async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return await this._equipmentRepository.update(id, updateEquipmentDto as Partial<EquipmentEntity>);
  }

  public async delete(id: number) {
    return await this._equipmentRepository.softDelete(id);
  }

  public async history(id: number) {
    return await this._equipmentHistoryEntityRepository.find({where: {equipoId: id}});
  }
}
