import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentQueryDto } from './dto/equipment-query.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly _equipmentService: EquipmentService) {}

  @Get()
  public async list(@Query() query: EquipmentQueryDto) {
    return await this._equipmentService.list(query);
  }

  @Post()
  public async create(@Body() createCompanyDto: CreateEquipmentDto) {
    return await this._equipmentService.create(createCompanyDto);
  }
  @Patch(":id")
  public async update(@Param("id") id: number, @Body() updateCompanyDto: UpdateEquipmentDto) {
    return await this._equipmentService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  public async delete(@Param("id") id: number) {
    return await this._equipmentService.delete(id);
  }
}
