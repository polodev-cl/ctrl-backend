import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseFloatPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
}                          from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { v4 }    from 'uuid';
import * as xlsx from 'xlsx';

import { CreateMassiveDto }               from '@modules/equipment/dto/create-massive.dto';
import { ResponseEquipmentHistoryMapper } from '@modules/equipment/mappers/response-equipment-history.mapper';
import { ResponseEquipmentMiniMapper }    from '@modules/equipment/mappers/response-equipment-mini.mapper';
import { UploadStateEnum }                from '@modules/massive-upload/enum/upload-state.enum';
import { UploadTypeEnum }                 from '@modules/massive-upload/enum/upload-type.enum';
import { UploadService }                  from '@modules/massive-upload/services/upload.service';

import { EXCEL_MIME_TYPE }    from '../../common/constants';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentQueryDto }  from './dto/equipment-query.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentService }   from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly _equipmentService: EquipmentService,
              private readonly _uploadService: UploadService) {}

  @Get()
  public async list(@Query() query: EquipmentQueryDto) {
    return await this._equipmentService.list(query);
  }

  @Get('/mini')
  public async light(@Query() query: EquipmentQueryDto) {
    return await this._equipmentService.list(query)
      .then((data) => data.map(ResponseEquipmentMiniMapper.map));
  }

  @Get('/:id')
  public async getById(@Param('id', ParseFloatPipe) id: number) {
    console.log('id', id);
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
    @UploadedFile('file',
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({fileType: EXCEL_MIME_TYPE}),
        ],
      }),
    ) file: Express.Multer.File) {
    const uuid = v4();
    const errorList: Set<string> = new Set<string>();

    const s3Params = {
      Bucket: 'bucket',
      Key: `equipment-massive-upload/${ uuid }.xlsx`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    await this._uploadService.createOrUpdateProcess({
      uuid: uuid,
      filename: file.originalname,
      filepath: s3Params.Key,
      state: UploadStateEnum.NOT_STARTED,
      uploadType: UploadTypeEnum.EQUIPMENT
    });

    const workbook = xlsx.read(file.buffer, {type: 'buffer'});
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const massiveDto = data.map(CreateMassiveDto.fromExcelRow);

    try {
      await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.VALIDATING});
      await this._equipmentService.validateMassiveUpload(massiveDto, errorList);

      if (errorList.size > 0) {
        await this._uploadService.setProcessError(uuid, errorList);
        return {uuid, errors: Array.from(errorList), step: UploadStateEnum.VALIDATING};
      }

      // This object contain parsed data, ready for the database
      const massiveParsedDto = massiveDto.map(CreateMassiveDto.toEntity);

      // Find duplicates resources in the Excel file
      await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.LOOKING_FOR_EXCEL_DUPLICATES});
      await this._equipmentService.massiveFindExcelDuplicates(massiveParsedDto, errorList);

      if (errorList.size > 0) {
        await this._uploadService.setProcessError(uuid, errorList);
        return {uuid, errors: Array.from(errorList), step: UploadStateEnum.LOOKING_FOR_EXCEL_DUPLICATES};
      }

      await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.LOOKING_FOR_DUPLICATES});
      await this._equipmentService.massiveFindDBDuplicates(massiveParsedDto, errorList);

      if (errorList.size > 0) {
        await this._uploadService.setProcessError(uuid, errorList);
        return {uuid, errors: Array.from(errorList), step: UploadStateEnum.LOOKING_FOR_DUPLICATES};
      }

      await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.UPLOADING});
      const {completed} = await this._equipmentService.massiveUpload(massiveParsedDto, errorList);

      if (errorList.size > 0) {
        await this._uploadService.setProcessError(uuid, errorList);
        return {uuid, errors: errorList, step: UploadStateEnum.UPLOADING};
      } else {
        await this._uploadService.createOrUpdateProcess({uuid: uuid, state: UploadStateEnum.FINISHED});
        return {uuid, completed, errors: errorList, step: UploadStateEnum.FINISHED};
      }
    } catch (err) {
      errorList.add(err.message);
      await this._uploadService.setProcessError(uuid, errorList);
      return {uuid, errors: Array.from(errorList)};
    }
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
