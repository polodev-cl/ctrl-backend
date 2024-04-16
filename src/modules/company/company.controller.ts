import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyQueryDto }                    from '@modules/company/dto/company-query.dto';
import { CompanyService }               from '@modules/company/company.service';
import { CreateCompanyDto }             from '@modules/company/dto/create-company.dto';

@Controller('company')
export class CompanyController {

  constructor(private readonly _companyService: CompanyService) {}

  @Get()
  public async list(@Query() query: CompanyQueryDto) {
    return await this._companyService.list(query);
  }

  @Post()
  public async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this._companyService.create(createCompanyDto);
  }
}
