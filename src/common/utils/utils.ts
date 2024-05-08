import { Equal, ILike }     from 'typeorm';
import { CreateMassiveDto } from '@modules/equipment/dto/create-massive.dto';

export function getWhereFilter(dto: any) {
  return Object.keys(dto).reduce((acc, key) => {
    if (dto[key] && !isNaN(dto[key])) acc[key] = Equal(dto[key]);
    else if (dto[key]) acc[key] = ILike(`%${ dto[key] }%`);
    return acc;
  }, {});
}

// ExcelJS utils functions
export function convertJsonToDtoArray(data: any[]): CreateMassiveDto[] {
  const columns = data[1].map((col: string) => col.toUpperCase().trim());

  const result: any[] = [];

  for (let i = 2; i < data.length; i++) {
    const row = data[i];
    if (row && row.length > 0) {

      const tempObj: any = {};
      columns.forEach((col: any, index: number) => {
        // if undefined or null, set undefined, else trim the field
        tempObj[col] = row[index] === undefined || row[index] === null ? undefined : row[index].toString().trim();
      });

      const dtoInstance = CreateMassiveDto.fromExcelRow(tempObj);
      result.push(dtoInstance);
    }
  }

  return result;
}
