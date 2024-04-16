import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CompanyEntity } from '@modules/company/entities/company.entity';

@Entity('ctrl_agencia')
export class AgencyEntity {
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

  @Column({comment: 'Empresa a la que pertenece la agencia'})
  empId: number;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({name: 'emp_id', referencedColumnName: 'id'})
  empresa: CompanyEntity;

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de creacion'})
  fechaCreacion: Date;

  @UpdateDateColumn({type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de modificación'})
  fechaModificacion: Date;

  @DeleteDateColumn({type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de eliminación'})
  fechaEliminacion: Date;
}
