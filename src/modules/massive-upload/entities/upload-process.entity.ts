import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { UploadStateEnum }                                                                     from '@modules/massive-upload/enum/upload-state.enum';
import { v4 }                                                                                  from 'uuid';
import { UploadTypeEnum }                                                                      from '@modules/massive-upload/enum/upload-type.enum';
import { IUpload }                                                                             from '@modules/massive-upload/interfaces/upload.interface';

@Entity('ctrl_proceso_carga')
export class UploadProcessEntity implements IUpload {
  @PrimaryColumn({comment: 'Identificador del proceso de carga', type: 'uuid', default: () => v4()})
  uuid: string;

  @Column({length: 255, comment: 'Nombre del archivo'})
  filename: string;

  @Column({length: 255, comment: 'Ruta del archivo'})
  filepath: string;

  @Column({type: 'enum', enum: UploadStateEnum, comment: 'Estado de la carga', default: UploadStateEnum.NOT_STARTED})
  state: UploadStateEnum;

  @Column({type: 'jsonb', comment: 'Errores en la carga', nullable: true})
  errors: string[];

  @Column({type: 'enum', enum: UploadTypeEnum, comment: 'Tipo de carga'})
  uploadType: UploadTypeEnum;

  @CreateDateColumn({name: 'fecha_creacion', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de creacion'})
  createdAt: Date;

  @UpdateDateColumn({
    name: 'fecha_modificacion',
    type: 'timestamptz',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de modificación'
  })
  updatedAt: Date;

  @DeleteDateColumn({name: 'fecha_eliminacion', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP', comment: 'Fecha y hora de eliminación'})
  deletedAt: Date;
}
