import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity }                                                                                              from '@modules/user/entities/user.entity';

@Entity('ctrl_empresa')
export class CompanyEntity {
  @PrimaryGeneratedColumn({comment: 'Identificador de la empresa'})
  id: number;

  @Column({name: 'rut', length: 50, comment: 'RUT de la empresa'})
  rut: string;

  @Column({name: 'razon_social', length: 255, comment: 'Razón social de la empresa'})
  razonSocial: string;

  @Column({name: 'nombre_corto', length: 100, comment: 'Nombre corto que permite la fácil identificación de la empresa'})
  nombreCorto: string;

  @Column({name: 'giro', length: 255, comment: 'Giro de la empresa'})
  giro: string;

  @Column({name: 'domicilio', length: 255, comment: 'Domicilio de la empresa'})
  domicilio: string;

  @Column({name: 'comuna', length: 50, comment: 'Comuna de la empresa'})
  comuna: string;

  @Column({name: 'sitio_web', length: 255, nullable: true, comment: 'Sitio Web de la empresa'})
  sitioWeb: string;

  @Column({name: 'observaciones', length: 255, nullable: true, comment: 'Observaciones adicionales del registro'})
  observaciones: string;

  @Column({name: 'prestador', default: false, comment: 'Indica si la empresa es el prestador de servicios o no'})
  prestador: boolean;

  @Column({name: 'activo', default: true, comment: 'Registro activo o inactivo'})
  activo: boolean;

  @OneToMany(() => UserEntity, (usuario) => usuario.empresa)
  usuarios: UserEntity[];

  @CreateDateColumn({name: 'fecha_creacion', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de creacion'})
  fechaCreacion: Date;

  @UpdateDateColumn({name: 'fecha_modificacion', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de modificación'})
  fechaModificacion: Date;

  @DeleteDateColumn({name: 'fecha_eliminacion', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de eliminación'})
  fechaEliminacion: Date;
}
