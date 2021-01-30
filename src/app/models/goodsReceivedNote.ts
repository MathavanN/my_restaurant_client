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
    receivedUserId: string;
    receivedUserName: string;
    receivedDate: Date;
    createdUserId: string;
    createdUserName: string;
    createdDate: Date;
}

export class CreateGoodsReceivedNote {
    id: number = 0;
    purchaseOrderId: number = 0;
    invoiceNumber: string = "";
    paymentTypeId: number = 0;
    nbt: number = 0;
    vat: number = 0;
    discount: number = 0;
    receivedUserId: string = "";
    receivedDate: Date = new Date()
    constructor(init?: IGoodsReceivedNote) {
        Object.assign(this, init);
    }
}

