export interface ISelectInputOptions {
    key: number,
    text: string,
    value: number
}
export interface ISelectGuidInputOptions {
    key: string,
    text: string,
    value: string
}

export interface ITest<T> {
    key: string,
    value: T
}