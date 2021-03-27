import { GoodsReceivedNoteFreeItemFormValues } from './goodsReceivedNoteFreeItemFormValues';

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
