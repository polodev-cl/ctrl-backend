import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { UserEntity } from '@modules/user/entities/user.entity';

@Entity('ctrl_rol')
@Unique(['nombre'])
export class RolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => UserEntity, usuario => usuario.rol)
  usuarios: UserEntity[];

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de creacion'})
  fechaCreacion: Date;

  @UpdateDateColumn({type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de modificación'})
  fechaModificacion: Date;

  @DeleteDateColumn({type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de eliminación'})
  fechaEliminacion: Date;
}
