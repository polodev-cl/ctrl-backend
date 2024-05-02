import { Injectable }       from '@nestjs/common';
import { S3 }               from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

@Injectable()
export class StorageService {
  private readonly s3 = new S3();

  constructor() {}

  upload(s3Params: PutObjectRequest) {
    // Upload file to S3
    return this.s3.upload({
      ...s3Params
    }).promise();
  }
}
