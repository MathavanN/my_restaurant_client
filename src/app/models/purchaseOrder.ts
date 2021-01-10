export interface IPurchaseOrder {
    id: number;
    orderNumber: string;
    supplierId: number;
    supplierName: string;
    requestedBy: string;
    requestedDate: Date;
    approvalStatus: string;
    approvedBy: string;
    approvedDate: Date;
    discount: number;
    description: string;
}


export class CreatePurchaseOrder {
    id: number = 0;
    supplierId: number = 0;
    discount: number = 0;
    description: string = "";
    constructor(init?: PurchaseOrderFormValues) {
        Object.assign(this, init);
    }
}

export class PurchaseOrderFormValues {
    id: number = 0;
    supplierId: number = 0;
    supplierName: string = "";
    discount: number = 0;
    description: string = "";
    constructor(init?: IPurchaseOrder) {
        Object.assign(this, init);
    }
}