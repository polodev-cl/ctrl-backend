import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from '@modules/agency/entities/agency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgencyEntity]),
  ],
  controllers: [AgencyController],
  providers: [AgencyService]
})
export class AgencyModule {}
