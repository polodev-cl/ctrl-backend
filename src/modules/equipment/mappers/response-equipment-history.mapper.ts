import { UserEntity } from '@modules/user/entities/user.entity';
import { IEquipmentHistory } from '@modules/equipment/interfaces/equipment-history.interface';
import { EquipmentHistoryEntity } from '@modules/equipment/entities/equipment-history.entity';
import { EquipmentStatusEnum } from '../enums/equipment-status.enum';

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

    if (entity.usuario) {
      usuario = {
        id: entity.usuario.id,
        nombres: entity.usuario.nombres + ' ' + entity.usuario.apellidos,
        rut: entity.usuario.rut
      };
    }

    // status mapper

    let descripcion = entity.descripcion;

    const estadoCambioRegex = /estado cambió de (\d+) a (\d+)/;
    const match = estadoCambioRegex.exec(descripcion);

    if (match) {
      const estadoAnterior = parseInt(match[1], 10);
      const estadoNuevo = parseInt(match[2], 10);
      const estadoAnteriorTraducido = EquipmentStatusEnum[estadoAnterior] || match[1];
      const estadoNuevoTraducido = EquipmentStatusEnum[estadoNuevo] || match[2];
      descripcion = descripcion.replace(match[0], `estado cambió de ${estadoAnteriorTraducido} a ${estadoNuevoTraducido}`);
    }

    return new ResponseEquipmentHistoryMapper({
      id: entity.id,
      equipoId: entity.equipoId,
      descripcion: descripcion,
      fechaCreacion: entity.fechaCreacion,
      usuario: usuario
    });
  }
}
