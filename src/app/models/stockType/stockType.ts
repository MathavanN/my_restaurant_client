export interface IStockType {
  id: number;
  type: string;
  description: string;
}

export interface IStockTypeSerial extends IStockType {
  serial: number;
}
