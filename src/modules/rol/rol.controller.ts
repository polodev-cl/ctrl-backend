import { Controller, Get, Query } from '@nestjs/common';
import { RolService }             from '@modules/rol/rol.service';
import { RolQueryDto }            from '@modules/rol/dto/rol-query.dto';
import { CreateRolDto }           from '@modules/rol/dto/create-rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly _rolService: RolService) {}

  @Get()
  public async list(@Query() query: RolQueryDto) {
    return await this._rolService.list(query);
  }

  public async create(createRolDto: CreateRolDto) {
    return await this._rolService.create(createRolDto);
  }
}
