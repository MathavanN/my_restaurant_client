import { IPaymentType } from "./paymentType";

export class PaymentTypeFormValues {
  id: number = 0;

  name: string = '';

  creditPeriod: number = 0;

  constructor(init?: IPaymentType) {
    Object.assign(this, init);
  }
}
