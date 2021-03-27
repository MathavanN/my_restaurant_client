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