import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ISelectInputOptions } from '../models/common';
import { IStockType } from '../models/stockType';
import { RootStore } from './rootStore';

export default class StockTypeStore {
    rootStore: RootStore;
    stockType: IStockType | null = null;
    stockTypeRegistry = new Map();
    loadingInitial = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this);
    }

    @computed get getStockTypes() {
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());

        return Object.entries(stockTypes.reduce((stockTypes, stockType, i) => {
            stockTypes[++i] = stockType;
            return stockTypes;
        }, {} as { [key: number]: IStockType }));
    }

    @computed get loadStockTypeOptions() {
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());
        return stockTypes.map(stockType => {
            return {
                key: stockType.id,
                text: stockType.type,
                value: stockType.id,
            } as ISelectInputOptions;
        });
    }

    loadStockTypes = async () => {
        this.loadingInitial = true;
        try {
            const stockTypes = await agent.StockType.list();
            runInAction(() => {
                stockTypes.forEach(stockType => {
                    this.stockTypeRegistry.set(stockType.id, stockType)
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }

    loadStockType = async (id: number) => {
        this.loadingInitial = true;
        try {
            const stockType = await agent.StockType.detail(id);
            runInAction(() => {
                this.stockType = stockType;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }

    createStockType = async (values: IStockType) => {
        try {
            const stockType = await agent.StockType.create(values);
            runInAction(() => {
                this.stockTypeRegistry.set(stockType.id, stockType)
            })
        } catch (error) {
            throw error;
        }
    }

    updateStockType = async (values: IStockType) => {
        try {
            const stockType = await agent.StockType.update(values);
            runInAction(() => {
                this.stockTypeRegistry.set(values.id, stockType)
            })
        } catch (error) {
            throw error;
        }
    }

    deleteStockType = async (id: number) => {
        try {
            await agent.StockType.delete(id);
            runInAction(() => {
                this.stockTypeRegistry.delete(id);
            })
        } catch (error) {
            throw error;
        }
    }

    // getSortedStockTypes() {
    //     const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());
    //     return stockTypes.sort(
    //         (a, b) => a.type.toLowerCase() === b.type.toLowerCase() ? 0 : (a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1)
    //     );
    // }
}