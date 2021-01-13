export interface IPurchaseOrderItem {
    id: number;
    purchaseOrderId: number;
    itemId: number;
    itemName: string;
    itemUnit: number;
    unitOfMeasureCode: string;
    itemUnitPrice: number;
    quantity: number;
    discount: number;
}


export class CreatePurchaseOrderItem {
    id: number = 0;
    purchaseOrderId: number = 0;
    itemId: number = 0;
    itemUnitPrice: number = 0;
    discount: number = 0;
    quantity: number = 0;
    constructor(init?: PurchaseOrderItemFormValues) {
        Object.assign(this, init);
    }
}

export class PurchaseOrderItemFormValues {
    id: number = 0;
    purchaseOrderId: number = 0;
    itemId: number = 0;
    itemName: string = "";
    itemUnitPrice: number = 0;
    discount: number = 0;
    quantity: number = 0;
    constructor(init?: IPurchaseOrderItem) {
        Object.assign(this, init);
    }
}