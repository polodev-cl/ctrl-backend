import { CompanyEntity }         from '@modules/company/entities/company.entity';
import { AgencyEntity }          from '@modules/agency/entities/agency.entity';
import { IEquipment }            from '@modules/equipment/interfaces/equipment.interface';
import { EquipmentDiskTypeEnum } from '@modules/equipment/enums/equipment-disk-type.enum';
import { EquipmentUseEnum }      from '@modules/equipment/enums/equipment-use.enum';
import { EquipmentStatusEnum }   from '@modules/equipment/enums/equipment-status.enum';

export class CreateMassiveDto {
  public empresa: string;
  public rutUsuario: string;
  public agencia: string;
  // public nemonico: string;
  // public dpc: string;
  public caja: string;
  public ubicacion: string;
  public equipo: string;
  public marca: string;
  public modelo: string;
  public sistemaOperativo: string;
  public mac: string;
  public nombreEquipo: string;
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
  public garantia: number;
  public fechaIngreso: Date;
  public fechaCompra: Date;

  // Custom fields for creation
  public company?: CompanyEntity;
  public agency?: AgencyEntity;

  constructor(values: CreateMassiveDto) {
    Object.assign(this, values);
  }

  static fromExcelRow(row: any): CreateMassiveDto {
    // PARSE EXCEL DATE TO JS DATE
    const fechaIngreso = row['FECHA INGRESO'] ? new Date(Math.round((row['FECHA INGRESO'] - 25569) * 86400 * 1000)) : undefined;
    const fechaCompra = row['FECHA COMPRA'] ? new Date(Math.round((row['FECHA COMPRA'] - 25569) * 86400 * 1000)) : undefined;

    return new CreateMassiveDto({
      empresa: row['EMPRESA'] === 'N/A' || row['EMPRESA'] === '' ? undefined : row['EMPRESA'],
      rutUsuario: row['RUT USUARIO'] === 'N/A' || row['RUT USUARIO'] === '' ? undefined : row['RUT USUARIO'],
      agencia: row['AGENCIA'] === 'N/A' || row['AGENCIA'] === '' ? undefined : row['AGENCIA'],
      caja: row['USO'] === 'N/A' || row['USO'] === '' ? undefined : EquipmentUseEnum[row['USO']],
      ubicacion: row['UBICACION'] === 'N/A' || row['UBICACION'] === '' ? undefined : row['UBICACION'],
      equipo: row['EQUIPO'] === 'N/A' || row['EQUIPO'] === '' ? undefined : row['EQUIPO'],
      marca: row['MARCA'] === 'N/A' || row['MARCA'] === '' ? undefined : row['MARCA'],
      modelo: row['MODELO'] === 'N/A' || row['MODELO'] === '' ? undefined : row['MODELO'],
      sistemaOperativo: row['SISTEMA OPERATIVO'] === 'N/A' || row['SISTEMA OPERATIVO'] === '' ? undefined : row['SISTEMA OPERATIVO'],
      mac: row['MAC'] === 'N/A' || row['MAC'] === '' ? undefined : row['MAC'],
      nombreEquipo: row['NOMBRE EQUIPO'] === 'N/A' || row['NOMBRE EQUIPO'] === '' ? undefined : row['NOMBRE EQUIPO'],
      procesador: row['PROCESADOR'] === 'N/A' || row['PROCESADOR'] === '' ? undefined : row['PROCESADOR'],
      ram: row['RAM'] === 'N/A' || row['RAM'] === '' ? undefined : row['RAM'],
      ssdHdd: row['SSD/HDD'] === 'N/A' || row['SSD/HDD'] === '' ? undefined : EquipmentDiskTypeEnum[row['SSD/HDD']],
      ip: row['IP'] === 'N/A' || row['IP'] === '' ? undefined : row['IP'],
      ddllTbk: row['DDLL TBK'] === 'N/A' || row['DDLL TBK'] === '' ? undefined : row['DDLL TBK'],
      numeroSerie: row['NUMERO SERIE'] === 'N/A' || row['NUMERO SERIE'] === '' ? undefined : row['NUMERO SERIE'],
      numeroInventario: row['NUMERO INVENTARIO'] === 'N/A' || row['NUMERO INVENTARIO'] === '' ? undefined : row['NUMERO INVENTARIO'],
      estado: row['ESTADO'] === 'N/A' || row['ESTADO'] === '' ? undefined : EquipmentStatusEnum[row['ESTADO']],
      encargadoAgencia: row['ENCARGADO AGENCIA'] === 'N/A' || row['ENCARGADO AGENCIA'] === '' ? undefined : row['ENCARGADO AGENCIA'],
      ordenCompra: row['ORDEN COMPRA'] === 'N/A' || row['ORDEN COMPRA'] === '' ? undefined : row['ORDEN COMPRA'],
      garantia: row['GARANTIA MESES'] === 'N/A' || row['GARANTIA MESES'] === '' ? undefined : row['GARANTIA MESES'],
      fechaIngreso: row['FECHA INGRESO'] === 'N/A' || row['FECHA INGRESO'] === '' ? undefined : fechaIngreso,
      fechaCompra: row['FECHA COMPRA'] === 'N/A' || row['FECHA COMPRA'] === '' ? undefined : fechaCompra,
    });
  }

  static toEntity(value: CreateMassiveDto): IEquipment {
    return {
      fechaIngreso: value.fechaIngreso,
      fechaCompra: value.fechaCompra,
      rut: value.rutUsuario,
      agenciaId: value.agency.id,
      agenciaDpc: value.agency.dpc,
      agenciaMnemonic: value.agency.nemonico,
      ordenCompra: value.ordenCompra ? value.ordenCompra : 0,
      inventario: value.numeroInventario ? parseInt(value.numeroInventario.toString()) : undefined,
      tipo: value.equipo,
      marca: value.marca,
      modelo: value.modelo,
      sistemaOperativo: value.sistemaOperativo,
      mac: value.mac,
      ip: value.ip,
      nombre: value.nombreEquipo || 'N/A',
      procesador: value.procesador,
      ramGb: value.ram ? parseInt(value.ram) : undefined,
      disco: value.ssdHdd,
      ddllTbk: value.ddllTbk,
      serie: value.numeroSerie ? value.numeroSerie : 'N/A',
      encargadoAgencia: value.encargadoAgencia,
      ubicacion: value.ubicacion ? value.ubicacion : 'N/A',
      garantiaMeses: value.garantia,
    } as IEquipment;
  }
}
