/* eslint-disable import/no-cycle */
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
        const items: IStockType[] = Array.from(this.stockTypeRegistry.values());

        return Object.entries(items.reduce((stockTypes, stockType, i) => {
            const key = i + 1;
            // eslint-disable-next-line no-param-reassign
            stockTypes[key] = stockType;
            return stockTypes;
        }, {} as { [key: number]: IStockType }));
    }

    @computed get loadStockTypeOptions() {
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());
        return stockTypes.map(stockType => ({
            key: stockType.id,
            text: stockType.type,
            value: stockType.id,
        } as ISelectInputOptions));
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
            throw error;
        }
    }

    createStockType = async (values: IStockType) => {
        const stockType = await agent.StockType.create(values);
        runInAction(() => {
            this.stockTypeRegistry.set(stockType.id, stockType)
        });
    }

    updateStockType = async (values: IStockType) => {
        const stockType = await agent.StockType.update(values);
        runInAction(() => {
            this.stockTypeRegistry.set(values.id, stockType)
        });
    }

    deleteStockType = async (id: number) => {
        await agent.StockType.delete(id);
        runInAction(() => {
            this.stockTypeRegistry.delete(id);
        });
    }
}