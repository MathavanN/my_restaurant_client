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



