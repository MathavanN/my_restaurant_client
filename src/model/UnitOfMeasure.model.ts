export interface IUnitOfMeasure {
    id: number;
    code: string;
    description: string;
}

export class UnitOfMeasureFormValues {
    id: number = 0;
    code: string = "";
    description: string = "";
    constructor(init?: IUnitOfMeasure) {
        Object.assign(this, init);
    }
}