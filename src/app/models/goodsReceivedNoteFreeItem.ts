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

export interface IGoodsReceivedNoteFreeItemSerial extends IGoodsReceivedNoteFreeItem {
  serial: number;
}