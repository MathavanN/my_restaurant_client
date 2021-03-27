import { IStockType } from "./stockType";

export class StockTypeFormValues {
    id: number = 0;

    type: string = "";

    description: string = "";

    constructor(init?: IStockType) {
        Object.assign(this, init);
    }
}