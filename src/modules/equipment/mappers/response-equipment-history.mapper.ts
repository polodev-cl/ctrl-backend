import { UserEntity }             from '@modules/user/entities/user.entity';
import { IEquipmentHistory }      from '@modules/equipment/interfaces/equipment-history.interface';
import { EquipmentHistoryEntity } from '@modules/equipment/entities/equipment-history.entity';

export class ResponseEquipmentHistoryMapper implements Partial<IEquipmentHistory> {
  public readonly id: number;
  public readonly equipoId: number;
  public readonly descripcion: string;
  public readonly fechaCreacion: Date;
  public readonly usuario?: Partial<UserEntity>;

  constructor(values: ResponseEquipmentHistoryMapper) {
    Object.assign(this, values);
  }

  static map(entity: EquipmentHistoryEntity): ResponseEquipmentHistoryMapper {
    let usuario: Partial<UserEntity>;

    if (entity.usuario) usuario = {
      id: entity.usuario.id,
      nombres: entity.usuario.nombres + ' ' + entity.usuario.apellidos,
      rut: entity.usuario.rut
    };

    return new ResponseEquipmentHistoryMapper({
      id: entity.id,
      equipoId: entity.equipoId,
      descripcion: entity.descripcion,
      fechaCreacion: entity.fechaCreacion,
      usuario: usuario
    });
  }
}
