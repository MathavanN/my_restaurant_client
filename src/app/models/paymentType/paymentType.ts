export interface IPaymentType {
  id: number;
  name: string;
  creditPeriod: number;
}

export interface IPaymentTypeSerial extends IPaymentType {
  serial: number;
}
