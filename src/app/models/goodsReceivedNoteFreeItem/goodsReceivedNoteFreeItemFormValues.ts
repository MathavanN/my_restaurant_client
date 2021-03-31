import { IGoodsReceivedNoteFreeItem } from './goodsReceivedNoteFreeItem';

export class GoodsReceivedNoteFreeItemFormValues {
  id: number = 0;

  goodsReceivedNoteId: number = 0;

  itemTypeId: number = 0;

  itemTypeName: string = '';

  itemId: number = 0;

  itemName: string = '';

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
