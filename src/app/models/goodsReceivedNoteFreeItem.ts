export interface IGoodsReceivedNoteFreeItem {
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

export class CreateGoodsReceivedNoteFreeItem {
    id: number = 0;
    goodsReceivedNoteId: number = 0;
    itemId: number = 0;
    itemUnitPrice: number = 0;
    quantity: number = 0;
    nbt: number = 0;
    vat: number = 0;
    discount: number = 0;
    constructor(init?: GoodsReceivedNoteFreeItemFormValues) {
        Object.assign(this, init);
    }
}

export class GoodsReceivedNoteFreeItemFormValues {
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
    constructor(goodsReceivedNoteId: number, init?: IGoodsReceivedNoteFreeItem) {
        this.goodsReceivedNoteId = goodsReceivedNoteId;
        Object.assign(this, init);
    }
}