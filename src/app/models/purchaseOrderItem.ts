export interface IPurchaseOrderItem {
    id: number;
    purchaseOrderId: number;
    itemTypeId: number;
    itemTypeName: string;
    itemId: number;
    itemName: string;
    itemUnit: number;
    unitOfMeasureCode: string;
    itemUnitPrice: number;
    quantity: number;
}


export class CreatePurchaseOrderItem {
    id: number = 0;
    purchaseOrderId: number = 0;
    itemTypeId: number = 0;
    itemTypeName: string = "";
    itemId: number = 0;
    itemUnitPrice: number = 0;
    constructor(init?: PurchaseOrderItemFormValues) {
        Object.assign(this, init);
    }
}

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