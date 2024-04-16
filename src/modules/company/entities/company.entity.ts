import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "@modules/user/entities/user.entity";

@Entity("ctrl_empresa")
export class CompanyEntity {
  @PrimaryGeneratedColumn({ comment: "Identificador de la empresa" })
  id: number;

  @Column({ length: 50, comment: "RUT de la empresa" })
  rut: string;

  @Column({ length: 255, comment: "Razón social de la empresa" })
  razonSocial: string;

  @Column({ length: 50, comment: "Nombre corto que permite la fácil identificación de la empresa" })
  nombreCorto: string;

  @Column({ length: 255, comment: "Giro de la empresa" })
  giro: string;

  @Column({ length: 255, comment: "Domicilio de la empresa" })
  domicilio: string;

  @Column({ length: 50, comment: "Comuna de la empresa" })
  comuna: string;

  @Column({ length: 255, nullable: true, comment: "Sitio Web de la empresa" })
  sitioWeb: string;

  @Column({ length: 255, nullable: true, comment: "Observaciones adicionales del registro" })
  observaciones: string;

  @Column({ default: false, comment: "Indica si la empresa es el prestador de servicios o no" })
  prestador: boolean;

  @Column({ default: true, comment: "Registro activo o inactivo" })
  activo: boolean;

  @OneToMany(() => UserEntity, (usuario) => usuario.empresa)
  usuarios: UserEntity[];

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", comment: "Fecha y hora de creacion" })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP", comment: "Fecha y hora de modificación" })
  fechaModificacion: Date;

  @DeleteDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP", comment: "Fecha y hora de eliminación" })
  fechaEliminacion: Date;
}
