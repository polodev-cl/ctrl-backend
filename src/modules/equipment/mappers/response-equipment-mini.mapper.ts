import { AgencyEntity }    from '@modules/agency/entities/agency.entity';
import { IEquipment }      from '@modules/equipment/interfaces/equipment.interface';
import { CompanyEntity }   from '@modules/company/entities/company.entity';
import { UserEntity }      from '@modules/user/entities/user.entity';
import { EquipmentEntity } from '@modules/equipment/entities/equipment.entity';

export class ResponseEquipmentMiniMapper implements Partial<IEquipment> {
  public id: number;
  public nombre: string;
  public tipo: string;
  public rut: string;
  public garantiaMeses: number;
  public fechaCompra?: Date;
  public inventario?: number;
  public modelo: string;
  public agencia?: Partial<AgencyEntity>;
  public empresa?: Partial<CompanyEntity>;
  public usuario?: Partial<UserEntity>;

  constructor(values: ResponseEquipmentMiniMapper) {
    Object.assign(this, values);
  }

  static map(entity: EquipmentEntity): ResponseEquipmentMiniMapper {

    let agencia: Partial<AgencyEntity>;
    let empresa: Partial<CompanyEntity>;
    let usuario: Partial<UserEntity>;

    if (entity.agencia)
      agencia = {id: entity.agenciaId, nombre: entity.agencia.nombre, nemonico: entity.agenciaMnemonic, dpc: entity.agenciaDpc};

    if (entity.agencia?.empresa) empresa = {
      id: entity.agencia.empresa.id,
      nombreCorto: entity.agencia.empresa.nombreCorto,
      razonSocial: entity.agencia.empresa.razonSocial
    };

    if (entity.usuarioCreacion) usuario = {
      id: entity.usuarioCreacion.id,
      nombres: entity.usuarioCreacion.nombres + ' ' + entity.usuarioCreacion.apellidos,
      rut: entity.usuarioCreacion.rut
    };

    return new ResponseEquipmentMiniMapper({
      id: entity.id,
      nombre: entity.nombre,
      tipo: entity.tipo,
      rut: entity.rut,
      garantiaMeses: entity.garantiaMeses,
      fechaCompra: entity.fechaCompra,
      inventario: entity.inventario,
      modelo: entity.modelo,
      agencia,
      empresa,
      usuario,
    });
  }
}
