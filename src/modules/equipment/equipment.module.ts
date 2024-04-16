import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentEntity } from './entities/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ EquipmentEntity ])
  ],
  providers: [EquipmentService],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
