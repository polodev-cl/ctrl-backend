import { CompanyEntity } from '@modules/company/entities/company.entity';
import { AgencyEntity }  from '@modules/agency/entities/agency.entity';
import { IEquipment }    from '@modules/equipment/interfaces/equipment.interface';

export class CreateMassiveDto {
  public empresa: string;
  public rutUsuario: string;
  public agenciaNombre: string;
  // public nemonico: string;
  // public dpc: string;
  public caja: string;
  public ubicacion: string;
  public equipo: string;
  public marca: string;
  public modelo: string;
  public sistemaOperativo: string;
  public mac: string;
  public nombreDeMaquina: string;
  public procesador: string;
  public ram: string;
  public ssdHdd: string;
  public ip: string;
  public ddllTbk: string;
  public numeroSerie: string;
  public numeroInventario: number;
  public estado: string;
  public encargadoAgencia: string;
  public ordenCompra: string;
  public fecha: Date;

  // Custom fields for creation
  public company?: CompanyEntity;
  public agency?: AgencyEntity;

  constructor(values: CreateMassiveDto) {
    Object.assign(this, values);
  }

  static fromExcelRow(row: any): CreateMassiveDto {
    return new CreateMassiveDto({
      empresa: row['Empresa'],
      rutUsuario: row['Rut Usuario'],
      agenciaNombre: row['Agencia Nombre'],
      // nemonico: row['Nemonico'],
      // dpc: row['DPC'],
      caja: row['caja'],
      ubicacion: row['Ubicacion'],
      equipo: row['Equipo'],
      marca: row['Marca'],
      modelo: row['Modelo'],
      sistemaOperativo: row['Sistema Operativo'],
      mac: row['MAC'],
      nombreDeMaquina: row['Nombre de Maquina'],
      procesador: row['Procesador'],
      ram: row['RAM'],
      ssdHdd: row['SSD/HDD'],
      ip: row['IP'],
      ddllTbk: row['DDLL TBK'],
      numeroSerie: row['Numero serie'],
      numeroInventario: row['Numero CI'],
      estado: row['Estado'],
      encargadoAgencia: row['Encargado Agencia'],
      ordenCompra: row['Orden de compra numero'],
      fecha: row['Fechas'],
    });
  }

  static toEntity(value: CreateMassiveDto): IEquipment {
    return {
      fechaIngreso: value.fecha,
      rut: value.rutUsuario,
      agenciaId: value.agency.id,
      agenciaDpc: value.agency.dpc,
      agenciaMnemonic: value.agency.nemonico,
      ordenCompra: value.ordenCompra,
      inventario: value.numeroInventario,
      tipo: value.equipo,
      marca: value.marca,
      modelo: value.modelo,
      sistemaOperativo: value.sistemaOperativo,
      mac: value.mac,
      ip: value.ip,
      nombre: value.nombreDeMaquina,
      procesador: value.procesador,
      ramGb: parseInt(value.ram),
      disco: value.ssdHdd,
      ddllTbk: value.ddllTbk,
      serie: value.numeroSerie,
      encargadoAgencia: value.encargadoAgencia,
      ubicacion: value.ubicacion,
      garantiaMeses: 0
    } as IEquipment;
  }
}
