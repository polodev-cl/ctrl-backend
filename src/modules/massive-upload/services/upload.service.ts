import { Injectable }          from '@nestjs/common';
import { InjectRepository }    from '@nestjs/typeorm';
import { UploadProcessEntity } from '@modules/massive-upload/entities/upload-process.entity';
import { Repository }          from 'typeorm';
import { IUpload }             from '@modules/massive-upload/interfaces/upload.interface';

@Injectable()
export class UploadService {
  constructor(@InjectRepository(UploadProcessEntity) private readonly uploadProcessRepository: Repository<UploadProcessEntity>) {}

  async createOrUpdateProcess(upload: Partial<IUpload>) {
    let uploadProcess = await this.uploadProcessRepository.findOne({where: {uuid: upload.uuid}});

    if (!uploadProcess) uploadProcess = this.uploadProcessRepository.create(upload);
    else uploadProcess = this.uploadProcessRepository.merge(uploadProcess, upload);

    return await this.uploadProcessRepository.save(uploadProcess);
  }

  async setProcessError(uuid: string, errors: Set<string>) {
    const uploadProcess = await this.uploadProcessRepository.findOne({where: {uuid: uuid}});
    if (uploadProcess.errors === null) uploadProcess.errors = [];

    uploadProcess.errors.push(...Array.from(errors));

    return await this.uploadProcessRepository.save(uploadProcess);
  }
}
