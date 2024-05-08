import { forwardRef, Module } from '@nestjs/common';
import { AgencyController }   from './agency.controller';
import { AgencyService }      from './agency.service';
import { TypeOrmModule }      from '@nestjs/typeorm';
import { AgencyEntity }       from '@modules/agency/entities/agency.entity';
import { EquipmentModule }    from '@modules/equipment/equipment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ AgencyEntity ]),
    forwardRef(() => EquipmentModule)
  ],
  controllers: [ AgencyController ],
  providers: [ AgencyService ],
  exports: [ AgencyService ],
})
export class AgencyModule {}
