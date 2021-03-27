import { StockItemFormValues } from "./stockItemFormValues";

export class CreateStockItem {
    id: number = 0;

    typeId: number = 0;

    unitOfMeasureId: number = 0;

    name: string = "";

    description: string = "";

    itemUnit: number = 0;

    constructor(init?: StockItemFormValues) {
        Object.assign(this, init);
    }
}