import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseFloatPipe,
  Patch,
  Post,
  Query,
  UseInterceptors
}                          from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { v4 }                             from 'uuid';
import { ResponseEquipmentHistoryMapper } from '@modules/equipment/mappers/response-equipment-history.mapper';
import { ResponseEquipmentMiniMapper }    from '@modules/equipment/mappers/response-equipment-mini.mapper';
import { UploadStateEnum }                from '@modules/massive-upload/enum/upload-state.enum';
import { UploadTypeEnum }                 from '@modules/massive-upload/enum/upload-type.enum';
import { UploadService }                  from '@modules/massive-upload/services/upload.service';
import { CreateEquipmentDto }             from './dto/create-equipment.dto';
import { EquipmentQueryDto }              from './dto/equipment-query.dto';
import { UpdateEquipmentDto }             from './dto/update-equipment.dto';
import { EquipmentService }               from './equipment.service';
import { UserCompany, UserCompanyType }   from '../../common/decorators/company-id.decorator';
import { CreateMassiveDto }               from '@modules/equipment/dto/create-massive.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly _equipmentService: EquipmentService,
              private readonly _uploadService: UploadService) {}

  @Get()
  public async list(
    @UserCompany() userCompany: UserCompanyType,
    @Query() query: EquipmentQueryDto
  ) {
    return await this._equipmentService.list(query, userCompany);
  }

  @Get('/mini')
  public async light(
    @UserCompany() userCompany: UserCompanyType,
    @Query() query: EquipmentQueryDto
  ) {
    return await this._equipmentService.list(query, userCompany)
      .then((data) => data.map(ResponseEquipmentMiniMapper.map));
  }

  @Get('/:id')
  public async getById(@Param('id', ParseFloatPipe) id: number) {
    return await this._equipmentService.getById(id);
  }

  @Get('/:id/history')
  public async history(@Param('id') id: number) {
    return await this._equipmentService.history(id)
      .then((data) => data.map(ResponseEquipmentHistoryMapper.map));
  }

  @Post()
  public async create(@Body() createCompanyDto: CreateEquipmentDto) {
    return await this._equipmentService.create(createCompanyDto);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async massiveUpload(
    @Body() massiveDto: CreateMassiveDto[]
  ) {
    const uuid = v4();
    const errorList: Set<string> = new Set<string>();

    const s3Params = {
      Bucket: 'bucket',
      Key: `equipment-massive-upload/${ uuid }.xlsx`,
      ACL: 'public-read'
    };

    await this._uploadService.createOrUpdateProcess({
      uuid: uuid,
      filename: `${ uuid }.xlsx`,
      filepath: s3Params.Key,
      state: UploadStateEnum.NOT_STARTED,
      uploadType: UploadTypeEnum.EQUIPMENT
    });

    // Flow xlsx lib
    // const workbook = xlsx.read(file.buffer, {type: 'buffer'});
    // const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // const data = xlsx.utils.sheet_to_json(sheet);

    // Flow exceljs lib
    // const workbook = new Exceljs.Workbook();
    // await workbook.xlsx.load(file.buffer);
    // const data = workbook.worksheets[0].getSheetValues();

    // const massiveDto = convertJsonToDtoArray(data);

    await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.VALIDATING});
    await this._equipmentService.validateMassiveUpload(massiveDto, errorList);

    if (errorList.size > 0) {
      await this._uploadService.setProcessError(uuid, errorList);
      throw new BadRequestException({uuid, errors: Array.from(errorList), step: UploadStateEnum.VALIDATING});
    }

    // This object contain parsed data, ready for the database
    const massiveParsedDto = massiveDto.map(CreateMassiveDto.toEntity);

    // Find duplicates resources in the Excel file
    await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.LOOKING_FOR_EXCEL_DUPLICATES});
    await this._equipmentService.massiveFindExcelDuplicates(massiveParsedDto, errorList);

    if (errorList.size > 0) {
      await this._uploadService.setProcessError(uuid, errorList);
      throw new BadRequestException({uuid, errors: Array.from(errorList), step: UploadStateEnum.LOOKING_FOR_EXCEL_DUPLICATES});
    }

    await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.LOOKING_FOR_DUPLICATES});
    await this._equipmentService.massiveFindDBDuplicates(massiveParsedDto, errorList);

    if (errorList.size > 0) {
      await this._uploadService.setProcessError(uuid, errorList);
      throw new BadRequestException({uuid, errors: Array.from(errorList), step: UploadStateEnum.LOOKING_FOR_DUPLICATES});
    }

    await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.UPLOADING});
    try {
      await this._equipmentService.massiveUpload(massiveParsedDto, errorList);
    } catch (err) {
      errorList.add(err.message);
      throw new InternalServerErrorException({uuid, errors: Array.from(errorList), step: UploadStateEnum.UPLOADING});
    }

    if (errorList.size > 0) {
      await this._uploadService.setProcessError(uuid, errorList);
      throw new BadRequestException({uuid, errors: errorList, step: UploadStateEnum.UPLOADING});
    }

    await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.FINISHED});
    return {uuid, completed: true, errors: errorList, step: UploadStateEnum.FINISHED};
  }

  @Patch('/:id')
  public async update(@Param('id') id: number, @Body() updateCompanyDto: UpdateEquipmentDto) {
    return await this._equipmentService.update(id, updateCompanyDto);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    return await this._equipmentService.delete(id);
  }
}
