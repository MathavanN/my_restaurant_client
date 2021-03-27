import { PurchaseOrderItemFormValues } from "./purchaseOrderItemFormValues";

export class CreatePurchaseOrderItem {
    id: number = 0;

    purchaseOrderId: number = 0;

    itemTypeId: number = 0;

    itemTypeName: string = "";

    itemId: number = 0;

    itemUnitPrice: number = 0;

    quantity: number = 0;

    constructor(init?: PurchaseOrderItemFormValues) {
        Object.assign(this, init);
    }
}