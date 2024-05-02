import { Body, Controller, Delete, Get, Param, ParseFloatPipe, Patch, Post, Query } from '@nestjs/common';
import { CompanyQueryDto }                                                          from '@modules/company/dto/company-query.dto';
import { CompanyService }                                                           from '@modules/company/company.service';
import { CreateCompanyDto }                                                         from '@modules/company/dto/create-company.dto';
import { UpdateCompanyDto }                                                         from './dto/update-company.dto';
import { ResponseCompanySelectorMapper }                                            from '@modules/company/mappers/response-company-selector.mapper';

@Controller("company")
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @Get()
  public async list(@Query() query: CompanyQueryDto) {
    return await this._companyService.list(query);
  }

  @Get('/selector')
  public async listSelector(@Query() query: CompanyQueryDto) {
    return (await this._companyService.list(query)).map(ResponseCompanySelectorMapper.map);
  }

  @Get('/:id')
  public async findById(@Param('id', ParseFloatPipe) id: number) {
    return await this._companyService.findById(id);
  }

  @Post()
  public async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this._companyService.create(createCompanyDto);
  }

  @Patch(":id")
  public async update(@Param("id") id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return await this._companyService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  public async delete(@Param("id") id: number) {
    return await this._companyService.delete(id);
  }
}
