import { IPurchaseOrder } from './purchaseOrder';

export class PurchaseOrderFormValues {
  id: number = 0;

  supplierId: number = 0;

  supplierName: string = '';

  description: string = '';

  constructor(init?: IPurchaseOrder) {
    Object.assign(this, init);
  }
}
