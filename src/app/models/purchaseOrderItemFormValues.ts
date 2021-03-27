import { IPurchaseOrderItem } from "./purchaseOrderItem";

export class PurchaseOrderItemFormValues {
    id: number = 0;

    purchaseOrderId: number = 0;

    itemTypeId: number = 0;

    itemTypeName: string = "";

    itemId: number = 0;

    itemName: string = "";

    itemUnitPrice: number = 0;

    quantity: number = 0;

    constructor(orderId: number, init?: IPurchaseOrderItem) {
        this.purchaseOrderId = orderId;
        Object.assign(this, init);
    }
}