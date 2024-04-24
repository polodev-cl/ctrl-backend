import { TypeOrmModule } from '@nestjs/typeorm';
import { Module }        from '@nestjs/common';

import { EquipmentHistoryEntity } from '@modules/equipment/entities/equipment-history.entity';

import { EquipmentService }    from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { EquipmentEntity }     from './entities/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ EquipmentEntity, EquipmentHistoryEntity ])
  ],
  providers: [ EquipmentService ],
  controllers: [ EquipmentController ],
  exports: []
})
export class EquipmentModule {}
