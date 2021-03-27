export interface IStockItemEnvelop {
    stockItems: IStockItem[],
    stockItemCount: number
}
export interface IStockItem {
    id: number;
    name: string;
    stockType: string;
    unitOfMeasureCode: string;
    description: string;
    typeId: number;
    unitOfMeasureId: number;
    itemUnit: number;
}

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

export class StockItemFormValues {
    id: number = 0;
    typeId: number = 0;
    stockType: string = "";
    unitOfMeasureId: number = 0;
    unitOfMeasureCode: string = "";
    name: string = "";
    description: string = "";
    itemUnit: number = 0;
    constructor(init?: IStockItem) {
        Object.assign(this, init);
    }
}