import { IAgency }       from '@modules/agency/interfaces/agency.interface';
import { CompanyEntity } from '@modules/company/entities/company.entity';
import { AgencyEntity }  from '@modules/agency/entities/agency.entity';

export class ResponseAgencyMapper implements IAgency {
  public id: number;
  public activo: boolean;
  public nombre: string;
  public nemonico: string;
  public dpc: number;
  public empId: number;
  public empresa: Partial<CompanyEntity>;

  constructor(values: ResponseAgencyMapper) {
    Object.assign(this, values);
  }

  static map(entity: AgencyEntity): ResponseAgencyMapper {
    let empresa: Partial<CompanyEntity> = undefined;

    if (entity.empresa)
      empresa = {
        id: entity.empresa.id,
        razonSocial: entity.empresa.razonSocial,
        nombreCorto: entity.empresa.nombreCorto,
        rut: entity.empresa.rut,
        activo: entity.empresa.activo
      };

    return {
      id: entity.id,
      activo: entity.activo,
      nombre: entity.nombre,
      nemonico: entity.nemonico,
      dpc: entity.dpc,
      empId: entity.empId,
      empresa
    };
  }
}
