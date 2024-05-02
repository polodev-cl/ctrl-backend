import { Module }              from '@nestjs/common';
import { TypeOrmModule }       from '@nestjs/typeorm';
import { UploadProcessEntity } from '@modules/massive-upload/entities/upload-process.entity';
import { UploadService }       from '@modules/massive-upload/services/upload.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ UploadProcessEntity ]) ],
  controllers: [],
  providers: [ UploadService ],
  exports: [ UploadService ]
})
export class MassiveUploadModule {}
