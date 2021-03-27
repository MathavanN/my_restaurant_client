import { PurchaseOrderFormValues } from "./purchaseOrderFormValues";

export class CreatePurchaseOrder {
    id: number = 0;

    supplierId: number = 0;

    description: string = "";

    constructor(init?: PurchaseOrderFormValues) {
        Object.assign(this, init);
    }
}