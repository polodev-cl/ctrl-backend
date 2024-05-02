import { EquipmentStatusEnum }   from '@modules/equipment/enums/equipment-status.enum';
import { EquipmentUseEnum }      from '@modules/equipment/enums/equipment-use.enum';
import { EquipmentDiskTypeEnum } from '@modules/equipment/enums/equipment-disk-type.enum';

export interface IEquipment {
  id?: number;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  estado?: EquipmentStatusEnum;
  fechaIngreso: Date;
  ordenCompra: string;
  rut?: string;
  agenciaId?: number;
  agenciaMnemonic?: string;
  agenciaDpc?: number;
  inventario?: number;
  tipo: string;
  sistemaOperativo?: string;
  sistemaOperativoVersion?: string;
  uso?: EquipmentUseEnum;
  marca: string;
  modelo: string;
  mac?: string;
  ip?: string;
  nombre: string;
  procesador?: string;
  ramGb?: number;
  disco?: EquipmentDiskTypeEnum;
  ddllTbk?: string;
  serie?: string;
  encargadoAgencia: string;
  ubicacion: string;
  garantiaMeses: number;
  usuarioIdCreacion?: number;
  usuarioIdModificacion?: number;
}
