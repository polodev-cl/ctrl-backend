import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AgencyService } from "./agency.service";
import { AgencyQueryDto } from "./dto/agency-query.dto";
import { CreateAgencyDto } from "./dto/create-agency.dto";
import { UpdateAgencyDto } from "./dto/update-agency.dto";

@Controller("agency")
export class AgencyController {
  constructor(private readonly _agencyService: AgencyService) {}

  @Get()
  public async list(@Query() query: AgencyQueryDto) {
    return await this._agencyService.list(query);
  }

  @Post()
  public async create(@Body() createAgencyDto: CreateAgencyDto) {
    return await this._agencyService.create(createAgencyDto);
  }

  @Patch(":id")
  public async update(@Param("id") id: number, @Body() updateAgencyDto: UpdateAgencyDto) {
    return await this._agencyService.update(id, updateAgencyDto);
  }

  @Delete(":id")
  public async delete(@Param("id") id: number) {
    return await this._agencyService.delete(id);
  }
}
