import { UserEntity } from "@modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("ctrl_equipo")
@Unique(["nombre"])
export class EquipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  fechaModificacion: Date;

  @Column({ type: "int", default: 1 })
  estado: number;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  fechaIngreso: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  ordenCompra: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  rut: string;

  @Column({ type: "int", nullable: true })
  ageId: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  ageNemonico: string;

  @Column({ type: "int", nullable: true })
  ageDpc: number;

  @Column({ type: "int", nullable: true })
  inventario: number;

  @Column({ type: "varchar", length: 50 })
  tipo: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  sistemaOperativo: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  sistemaOperativoVersion: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  uso: string;

  @Column({ type: "varchar", length: 50, default: "GENERICO" })
  marca: string;

  @Column({ type: "varchar", length: 50, default: "GENERICO" })
  modelo: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  mac: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  ip: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  nombre: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  procesador: string;

  @Column({ type: "int", nullable: true })
  ramGb: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  disco: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  ddllTbk: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  serie: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  encargadoAgencia: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  ubicacion: string;

  @Column({ type: "int", default: 0 })
  garantiaMeses: number;

  @ManyToOne(() => UserEntity, (user) => user.nombres)
  @JoinColumn({ name: "id_creacion" })
  idCreacion: number;

  @ManyToOne(() => UserEntity, (user) => user.nombres)
  @JoinColumn({ name: "id_modificacion" })
  id_modificacion: number;
}
