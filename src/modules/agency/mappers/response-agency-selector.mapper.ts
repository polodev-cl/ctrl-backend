import { AgencyEntity } from '@modules/agency/entities/agency.entity';

export class ResponseAgencySelectorMapper implements Partial<AgencyEntity> {
  id: number;
  nombre: string;
  dpc: number;
  nemonico: string;

  constructor(values: ResponseAgencySelectorMapper) {
    Object.assign(this, values);
  }

  static map(entity: AgencyEntity): ResponseAgencySelectorMapper {
    return new ResponseAgencySelectorMapper({
      id: entity.id,
      nombre: entity.nombre,
      dpc: entity.dpc,
      nemonico: entity.nemonico,
    });
  }
}
