import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';

import { CompanyEntity } from '@modules/company/entities/company.entity';
import { IAgency }       from '@modules/agency/interfaces/agency.interface';

@Entity('ctrl_agencia')
@Unique([ 'nombre', 'empId' ])
export class AgencyEntity implements IAgency {
  @PrimaryGeneratedColumn({comment: 'Identificador de la agencia'})
  id: number;

  @Column({default: true, comment: 'Registro activo o inactivo'})
  activo: boolean;

  @Column({length: 255, comment: 'Nombre de la agencia'})
  nombre: string;

  @Column({length: 255, comment: 'Nemónico de agencia'})
  nemonico: string;

  @Column({comment: 'DCP de agencia'})
  dpc: number;

  @Column({name: 'emp_id', comment: 'Empresa a la que pertenece la agencia'})
  empId: number;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({name: 'emp_id', referencedColumnName: 'id'})
  empresa: CompanyEntity;

  @CreateDateColumn({name: 'fecha_creacion', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de creacion'})
  fechaCreacion: Date;

  @UpdateDateColumn({name: 'fecha_modificacion', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de modificación'})
  fechaModificacion: Date;

  @DeleteDateColumn({name : 'fecha_eliminacion', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de eliminación'})
  fechaEliminacion: Date;
}
