import { IGoodsReceivedNote } from "./goodsReceivedNote";

export class CreateGoodsReceivedNote {
    id: number = 0;

    purchaseOrderId: number = 0;

    invoiceNumber: string = "";

    paymentTypeId: number = 0;

    nbt: number = 0;

    vat: number = 0;

    discount: number = 0;

    receivedBy: string = "";

    receivedDate: Date = new Date();

    constructor(init?: IGoodsReceivedNote) {
        Object.assign(this, init);
        if (init)
            this.receivedDate = new Date(init?.receivedDate)
    }
}