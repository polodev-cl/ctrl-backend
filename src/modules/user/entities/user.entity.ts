import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RolEntity } from "../../rol/entities/rol.entity";
import { CompanyEntity } from "@modules/company/entities/company.entity";

@Entity("ctrl_usuario")
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: "Identificador del usuario" })
  id: number;

  @Column({ type: "varchar", length: 255, comment: "Identificador del usuario Cognito" })
  cognito_id: string;

  @Column({ type: "boolean", default: true, comment: "Registro activo o inactivo" })
  activo: boolean;

  @Column({ type: "varchar", length: 50, comment: "Email del usuario" })
  email: string;

  @Column({ type: "varchar", length: 50, comment: "Contraseña codificada en MD5" })
  contrasena: string;

  @Column({ type: "varchar", length: 255, comment: "Nombres del usuario" })
  nombres: string;

  @Column({ type: "varchar", length: 255, comment: "Apellidos del usuario" })
  apellidos: string;

  @Column({ name: "usu_id_creacion", comment: "ID del usuario que creó el registro", nullable: true })
  usuarioCreacionId?: number;

  @Column({ name: "usu_id_modificacion", comment: "ID del usuario que modificó el registro", nullable: true })
  usuarioModificacionId?: number;

  @Column({ name: "rol_id", comment: "ID del rol del usuario" })
  rolId: number;

  @Column({ name: "emp_id", comment: "ID de la empresa del usuario" })
  empresaId: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "usu_id_creacion" })
  usuarioCreacion?: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "usu_id_modificacion" })
  usuarioModificacion: UserEntity;

  @ManyToOne(() => RolEntity, (usuarioRol) => usuarioRol.usuarios)
  @JoinColumn({ name: "rol_id" })
  rol: RolEntity;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: "emp_id" })
  empresa: CompanyEntity;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", comment: "Fecha y hora de creacion" })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP", comment: "Fecha y hora de modificación" })
  fechaModificacion: Date;

  @DeleteDateColumn({ type: "timestamptz", onUpdate: "CURRENT_TIMESTAMP", comment: "Fecha y hora de eliminación" })
  fechaEliminacion: Date;
}
