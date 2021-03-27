import { GoodsReceivedNoteItemFormValues } from "./goodsReceivedNoteItemFormValues";

export class CreateGoodsReceivedNoteItem {
    id: number = 0;

    goodsReceivedNoteId: number = 0;

    itemId: number = 0;

    itemUnitPrice: number = 0;

    quantity: number = 0;

    nbt: number = 0;

    vat: number = 0;

    discount: number = 0;

    constructor(init?: GoodsReceivedNoteItemFormValues) {
        Object.assign(this, init);
    }
}