import { Module }         from '@nestjs/common';
import { StorageService } from '@modules/aws/services/storage.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ StorageService ],
  exports: [ StorageService ]
})
export class AwsModule {}
