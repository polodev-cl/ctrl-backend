import { Body, Controller, Delete, Get, Param, ParseFloatPipe, Patch, Post, Query } from '@nestjs/common';

import { ResponseEquipmentMiniMapper }    from '@modules/equipment/mappers/response-equipment-mini.mapper';
import { ResponseEquipmentHistoryMapper } from '@modules/equipment/mappers/response-equipment-history.mapper';

import { EquipmentService }   from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentQueryDto }  from './dto/equipment-query.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly _equipmentService: EquipmentService) {}

  @Get()
  public async list(@Query() query: EquipmentQueryDto) {
    return await this._equipmentService.list(query);
  }

  @Get('mini')
  public async light(@Query() query: EquipmentQueryDto) {
    return await this._equipmentService.list(query)
      .then((data) => data.map(ResponseEquipmentMiniMapper.map));
  }

  @Get(':id')
  public async getById(@Param('id', ParseFloatPipe) id: number) {
    console.log('id', id);
    return await this._equipmentService.getById(id);
  }

  @Get(':id/history')
  public async history(@Param('id') id: number) {
    return await this._equipmentService.history(id)
      .then((data) => data.map(ResponseEquipmentHistoryMapper.map));
  }

  @Post()
  public async create(@Body() createCompanyDto: CreateEquipmentDto) {
    return await this._equipmentService.create(createCompanyDto);
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateCompanyDto: UpdateEquipmentDto) {
    return await this._equipmentService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this._equipmentService.delete(id);
  }
}
