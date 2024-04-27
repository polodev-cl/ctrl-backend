import { CompanyEntity } from '@modules/company/entities/company.entity';

export class ResponseCompanyMaintainerMapper implements Partial<CompanyEntity> {
  id: number;
  rut: string;
  razonSocial: string;
  nombreCorto: string;
  comuna: string;

  constructor(values: ResponseCompanyMaintainerMapper) {
    Object.assign(this, values);
  }

  static map(entity: CompanyEntity): ResponseCompanyMaintainerMapper {
    return new ResponseCompanyMaintainerMapper({
      id: entity.id,
      rut: entity.rut,
      razonSocial: entity.razonSocial,
      nombreCorto: entity.nombreCorto,
      comuna: entity.comuna
    });
  }
}
