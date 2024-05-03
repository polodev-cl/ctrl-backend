import { UserEntity }    from '@modules/user/entities/user.entity';
import { CompanyEntity } from '@modules/company/entities/company.entity';

export class ResponseUserMapper {
  public id: number;
  public cognito_id: string;
  public rut: string;
  public activo: boolean;
  public nombres: string;
  public apellidos: string;
  public rolId: number;
  public empresa: Partial<CompanyEntity>;

  constructor(values: ResponseUserMapper) {
    Object.assign(this, values);
  }

  static map(user: UserEntity): ResponseUserMapper {
    return new ResponseUserMapper({
      id: user.id,
      cognito_id: user.cognito_id,
      rut: user.rut,
      activo: user.activo,
      nombres: user.nombres,
      apellidos: user.apellidos,
      rolId: user.rolId,
      empresa: {
        id: user.empresa.id,
        nombreCorto: user.empresa.nombreCorto,
        prestador: user.empresa.prestador,
        activo: user.empresa.activo
      }
    });
  }
}
