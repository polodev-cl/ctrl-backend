import { Body, Controller, Delete, Get, Param, ParseFloatPipe, Patch, Post, Query } from '@nestjs/common';

import { ResponseAgencySelectorMapper } from '@modules/agency/mappers/response-agency-selector.mapper';

import { AgencyService }        from './agency.service';
import { AgencyQueryDto }       from './dto/agency-query.dto';
import { CreateAgencyDto }      from './dto/create-agency.dto';
import { UpdateAgencyDto }      from './dto/update-agency.dto';
import { ResponseAgencyMapper } from '@modules/agency/response-agency.mapper';

@Controller('agency')
export class AgencyController {
  constructor(private readonly _agencyService: AgencyService) {}

  @Get()
  public async list(@Query() query: AgencyQueryDto) {
    return await this._agencyService.list(query)
      .then((agencies) => agencies.map(ResponseAgencyMapper.map));
  }

  @Get(':id')
  public async findOne(@Param('id', ParseFloatPipe) id: number) {
    return await this._agencyService.findById(id).then(ResponseAgencyMapper.map);
  }

  @Get('/selector')
  public async listSelector(@Query() query: AgencyQueryDto) {
    return (await this._agencyService.list(query)).map(ResponseAgencySelectorMapper.map);
  }

  @Post()
  public async create(@Body() createAgencyDto: CreateAgencyDto) {
    return await this._agencyService.create(createAgencyDto);
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateAgencyDto: UpdateAgencyDto) {
    return await this._agencyService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this._agencyService.delete(id);
  }
}
