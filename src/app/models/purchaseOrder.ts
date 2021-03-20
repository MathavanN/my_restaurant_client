export interface IPurchaseOrder {
    id: number;
    orderNumber: string;
    supplierId: number;
    supplierName: string;
    requestedUserId: string;
    requestedUserName: string;
    requestedDate: Date;
    approvalStatus: string;
    approvedUserId: string;
    approvedUserName: string;
    approvedDate: Date;
    description: string;
}

export class CreatePurchaseOrder {
    id: number = 0;
    supplierId: number = 0;
    description: string = "";
    constructor(init?: PurchaseOrderFormValues) {
        Object.assign(this, init);
    }
}

export class ApprovalPurchaseOrder {
    id: number = 0;
    approvalStatus: string = "";
    approvalReason: string = "";
    constructor(id: number, status: string, reason: string) {
        this.id = id;
        this.approvalStatus = status;
        this.approvalReason = reason;
    }
}

export class PurchaseOrderFormValues {
    id: number = 0;
    supplierId: number = 0;
    supplierName: string = "";
    description: string = "";
    constructor(init?: IPurchaseOrder) {
        Object.assign(this, init);
    }
}