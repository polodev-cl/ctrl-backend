import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AgencyEntity }          from '@modules/agency/entities/agency.entity';
import { EquipmentDiskTypeEnum } from '@modules/equipment/enums/equipment-disk-type.enum';
import { EquipmentUseEnum }      from '@modules/equipment/enums/equipment-use.enum';
import { EquipmentStatusEnum }   from '@modules/equipment/enums/equipment-status.enum';
import { UserEntity }            from '@modules/user/entities/user.entity';

@Entity('ctrl_equipo')
// Add default filter
export class EquipmentEntity {
  @PrimaryGeneratedColumn({comment: 'Identificador del equipo'})
  id: number;

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de creacion'})
  fechaCreacion: Date;

  @UpdateDateColumn({type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de modificación'})
  fechaModificacion: Date;

  @Column({
    type: 'enum',
    enum: EquipmentStatusEnum,
    default: EquipmentStatusEnum.ACTIVO,
    comment: 'Estado del equipo. 0 = baja, 1 = activo, 2 = bodega'
  })
  estado: EquipmentStatusEnum;

  @Column({type: 'date', default: () => 'CURRENT_DATE', comment: 'Fecha de ingreso del equipo'})
  fechaIngreso: Date;

  @Column({length: 50, comment: 'Orden de compra del equipo'})
  ordenCompra: string;

  @Column({length: 50, nullable: true, comment: 'RUT de usuario asignado'})
  rut?: string;

  @Column({name: 'age_id', nullable: true, comment: 'Agencia a la que está vinculado el equipo'})
  agenciaId?: number;

  @Column({length: 255, nullable: true, comment: 'Nemónico se obtiene de agencia'})
  agenciaMnemonic?: string;

  @Column({type: 'int', nullable: true, comment: 'DCP se obtiene de agencia'})
  agenciaDpc?: number;

  @Column({nullable: true, comment: 'Control interno o número de inventario'})
  inventario?: number;

  @Column({length: 50, comment: 'Corresponde al tipo de equipo'})
  tipo: string;

  @Column({length: 50, nullable: true, comment: 'Sistema operativo del equipo'})
  sistemaOperativo?: string;

  @Column({length: 50, nullable: true, comment: 'Versión del sistema operativo del equipo'})
  sistemaOperativoVersion?: string;

  @Column({
    type: 'enum',
    enum: EquipmentUseEnum,
    default: EquipmentUseEnum.CAJA,
    comment: 'Uso del equipo'
  })
  uso: EquipmentUseEnum;

  @Column({length: 50, default: 'GENERICO', comment: 'Marca del equipo'})
  marca: string;

  @Column({length: 50, default: 'GENERICO', comment: 'Modelo del equipo'})
  modelo: string;

  @Column({length: 50, nullable: true, comment: 'Dirección MAC del equipo con validación de formato'})
  mac?: string;

  @Column({length: 50, nullable: true, comment: 'Dirección IP del equipo con validación de formato'})
  ip?: string;

  @Column({length: 50, comment: 'Nombre del equipo'})
  nombre: string;

  @Column({length: 50, nullable: true, comment: 'Procesador del equipo'})
  procesador?: string;

  @Column({type: 'int', nullable: true, comment: 'GB de RAM del equipo'})
  ramGb?: number;

  @Column({
    type: 'enum',
    enum: EquipmentDiskTypeEnum,
    nullable: true,
    comment: 'Tipo de disco del equipo'
  })
  disco?: EquipmentDiskTypeEnum;

  @Column({length: 50, nullable: true, comment: 'DDLL TBK del equipo con validación de formato'})
  ddllTbk?: string;

  @Column({length: 50, nullable: true, comment: 'Número de serie del equipo'})
  serie?: string;

  @Column({length: 50, comment: 'Encargado de la agencia'})
  encargadoAgencia: string;

  @Column({length: 50, comment: 'Ubicación descriptiva del equipo'})
  ubicacion: string;

  @Column({type: 'int', default: 0, comment: 'Meses de garantía del equipo'})
  garantiaMeses: number;

  @Column({name: 'usu_id_creacion', nullable: true, comment: 'ID del usuario que creó el registro'})
  usuarioIdCreacion: number;

  @Column({name: 'usu_id_modificacion',nullable: true, comment: 'ID del usuario que modificó el registro'})
  usuarioIdModificacion: number;

  @ManyToOne(() => AgencyEntity)
  @JoinColumn({name: 'age_id', referencedColumnName: 'id'})
  agencia?: AgencyEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'usu_id_creacion', referencedColumnName: 'id'})
  usuarioCreacion: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'usu_id_modificacion', referencedColumnName: 'id'})
  usuarioModificacion: UserEntity;
}
