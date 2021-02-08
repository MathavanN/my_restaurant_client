export interface IGoodsReceivedNoteItem {
    id: number;
    goodsReceivedNoteId: number;
    itemTypeId: number;
    itemTypeName: string;
    itemId: number;
    itemName: string;
    itemUnit: number;
    unitOfMeasureCode: string;
    itemUnitPrice: number;
    quantity: number;
    nbt: number;
    vat: number;
    discount: number;
}

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

export class GoodsReceivedNoteItemFormValues {
    id: number = 0;
    goodsReceivedNoteId: number = 0;
    itemTypeId: number = 0;
    itemTypeName: string = "";
    itemId: number = 0;
    itemName: string = "";
    itemUnitPrice: number = 0;
    quantity: number = 0;
    nbt: number = 0;
    vat: number = 0;
    discount: number = 0;
    constructor(goodsReceivedNoteId: number, init?: IGoodsReceivedNoteItem) {
        this.goodsReceivedNoteId = goodsReceivedNoteId;
        Object.assign(this, init);
    }
}