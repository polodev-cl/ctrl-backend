import { Injectable }                                 from '@nestjs/common';
import { InjectRepository }                           from '@nestjs/typeorm';
import { EquipmentEntity }                            from './entities/equipment.entity';
import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { EquipmentQueryDto }                          from './dto/equipment-query.dto';
import { CreateEquipmentDto }                         from './dto/create-equipment.dto';
import { UpdateEquipmentDto }                         from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(@InjectRepository(EquipmentEntity) private readonly _equipmentRepository: Repository<EquipmentEntity>) {}

  public async list(queryParams?: EquipmentQueryDto) {
    const whereFilter: FindOptionsWhere<EquipmentEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${queryParams[key]}%`);
      return acc;
    }, {});

    if (queryParams.id) whereFilter["id"] = Equal(queryParams.id);

    console.log(whereFilter);

    return await this._equipmentRepository.find({ where: whereFilter });
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
}
