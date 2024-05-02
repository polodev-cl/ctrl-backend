import { UploadStateEnum } from '@modules/massive-upload/enum/upload-state.enum';
import { UploadTypeEnum }  from '@modules/massive-upload/enum/upload-type.enum';

export interface IUpload {
  uuid: string;
  filename: string;
  filepath: string;
  state: UploadStateEnum;
  uploadType: UploadTypeEnum;
  errors?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
