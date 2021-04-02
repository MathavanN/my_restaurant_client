export interface IUnitOfMeasure {
  id: number;
  code: string;
  description: string;
}

export interface IUnitOfMeasureSerial extends IUnitOfMeasure {
  serial: number;
}
