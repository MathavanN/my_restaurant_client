export interface IGoodsReceivedNote {
    id: number;
    purchaseOrderId: number,
    purchaseOrderNumber: string;
    invoiceNumber: string;
    paymentTypeId: number;
    paymentTypeName: string;
    nbt: number;
    vat: number;
    discount: number;
    receivedBy: string;
    receivedUserName: string;
    receivedDate: Date;
    approvalStatus: string;
    approvedBy: string;
    approvedUserName: string;
    approvedDate: Date;
    approvalReason: string;
}

export class CreateGoodsReceivedNote {
    id: number = 0;
    purchaseOrderId: number = 0;
    invoiceNumber: string = "";
    paymentTypeId: number = 0;
    nbt: number = 0;
    vat: number = 0;
    discount: number = 0;
    receivedBy: string = "";
    receivedDate: Date = new Date()
    constructor(init?: IGoodsReceivedNote) {
        Object.assign(this, init);
        if (init)
            this.receivedDate = new Date(init?.receivedDate)
    }
}

