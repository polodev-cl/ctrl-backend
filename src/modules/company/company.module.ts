import { forwardRef, Module } from '@nestjs/common';
import { CompanyController }  from './company.controller';
import { CompanyService }     from './company.service';
import { TypeOrmModule }      from '@nestjs/typeorm';
import { CompanyEntity }      from '@modules/company/entities/company.entity';
import { EquipmentModule }    from '@modules/equipment/equipment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CompanyEntity ]),
    forwardRef(() => EquipmentModule)
  ],
  controllers: [ CompanyController ],
  providers: [ CompanyService ],
  exports: [ CompanyService ]
})
export class CompanyModule {}
