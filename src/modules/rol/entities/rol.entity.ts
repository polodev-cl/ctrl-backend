import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
