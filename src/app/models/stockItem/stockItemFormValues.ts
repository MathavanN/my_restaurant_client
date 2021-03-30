import { IStockItem } from './stockItem';

export class StockItemFormValues {
  id: number = 0;

  typeId: number = 0;

  stockType: string = '';

  unitOfMeasureId: number = 0;

  unitOfMeasureCode: string = '';

  name: string = '';

  description: string = '';

  itemUnit: number = 0;

  constructor(init?: IStockItem) {
    Object.assign(this, init);
  }
}
