export interface IStockType {
    id: number;
    type: string;
    description: string;
}

export class StockTypeFormValues {
    id: number = 0;
    type: string = "";
    description: string = "";
    constructor(init?: IStockType) {
        Object.assign(this, init);
    }
}