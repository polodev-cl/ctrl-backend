import { CompanyEntity } from '@modules/company/entities/company.entity';

export class ResponseCompanySelectorMapper implements Partial<CompanyEntity> {
  id: number;
  nombreCorto: string;

  constructor(values: ResponseCompanySelectorMapper) {
    Object.assign(this, values);
  }

  static map(entity: CompanyEntity): ResponseCompanySelectorMapper {
    return new ResponseCompanySelectorMapper({
      id: entity.id,
      nombreCorto: entity.nombreCorto
    });
  }
}
