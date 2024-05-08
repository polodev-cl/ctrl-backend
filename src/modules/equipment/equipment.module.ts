import { TypeOrmModule }      from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { AgencyModule }           from '@modules/agency/agency.module';
import { AwsModule }              from '@modules/aws/aws.module';
import { CompanyModule }          from '@modules/company/company.module';
import { EquipmentHistoryEntity } from '@modules/equipment/entities/equipment-history.entity';
import { MassiveUploadModule }    from '@modules/massive-upload/massive-upload.module';

import { EquipmentEntity }     from './entities/equipment.entity';
import { EquipmentService }    from './equipment.service';
import { EquipmentController } from './equipment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ EquipmentEntity, EquipmentHistoryEntity ]),
    AwsModule,
    MassiveUploadModule,
    forwardRef(() => AgencyModule),
    forwardRef(() => CompanyModule)
  ],
  providers: [ EquipmentService ],
  controllers: [ EquipmentController ],
  exports: [ EquipmentService ]
})
export class EquipmentModule {}
