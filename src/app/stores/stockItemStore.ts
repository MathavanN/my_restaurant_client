import { RootStore } from "./rootStore";
import { runInAction, makeAutoObservable, computed } from "mobx";
import { CreateStockItem, IStockItem } from "../models/stockItem";
import { ISelectInputOptions } from "../models/common";
import agent from "../api/agent";

const LIMIT = 5;
export default class StockItemStore {

    rootStore: RootStore;
    stockItem: IStockItem | null = null;
    stockItemRegistry = new Map(); // this is for pagination
    stockItemCount: number = 0;
    page: number = 1;
    loadingInitial = false;
    predicate = new Map();

    allStockItemsRegistry = new Map(); //this to show in dropdown
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    @computed get getStockItemTotalPages() {
        return Math.ceil(this.stockItemCount / LIMIT);
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? ((this.page - 1) * LIMIT) : 1}`)
        return params
    }

    setPredicate = (predicate: string, value: string | Date | number) => {
        this.predicate.set(predicate, value)
    }

    setStockItemPage = (page: number) => {
        this.page = page;
    }

    @computed get getStockItems() {
        const stockItems: IStockItem[] = Array.from(this.stockItemRegistry.values());

        return Object.entries(stockItems.reduce((stockItems, stockItem, i) => {
            const serialNumber = LIMIT * (this.page - 1) + i + 1;
            stockItems[serialNumber] = stockItem;
            return stockItems;
        }, {} as { [key: number]: IStockItem }));
    }

    loadStockItems = async (typeId: number) => {
        this.stockItemRegistry.clear();
        this.loadingInitial = true;
        try {
            const stockItemEnvelop = await agent.StockItem.list(typeId, this.axiosParams);
            const { stockItems, stockItemCount } = stockItemEnvelop;

            runInAction(() => {
                stockItems.forEach(stockItem => {
                    this.stockItemRegistry.set(stockItem.id, stockItem)
                });
                this.stockItemCount = stockItemCount;
                this.loadingInitial = false;
            })
        }
        catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    loadStockItem = async (id: number) => {
        this.loadingInitial = true;
        try {
            const stockItem = await agent.StockItem.detail(id);
            runInAction(() => {
                this.stockItem = stockItem;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }

    createStockItem = async (stockItem: CreateStockItem) => {
        try {
            const result = await agent.StockItem.create(stockItem);
            const x = await agent.StockItem.detail(result.id);
            runInAction(() => {
                this.stockItemRegistry.set(result.id, x)
            })
        } catch (error) {
            throw error;
        }
    }

    updateStockItem = async (stockItem: CreateStockItem) => {
        try {
            await agent.StockItem.update(stockItem);
            const x = await agent.StockItem.detail(stockItem.id);
            runInAction(() => {
                this.stockItemRegistry.set(stockItem.id, x)
            })
        } catch (error) {
            throw error;
        }
    }

    deleteStockItem = async (id: number) => {
        try {
            await agent.StockItem.delete(id);
            runInAction(() => {
                this.stockItemRegistry.delete(id);
            })
        } catch (error) {
            throw error;
        }
    }

    loadAllStockItems = async () => {
        this.allStockItemsRegistry.clear();
        try {
            const stockItems = await agent.StockItem.listAll();

            runInAction(() => {
                stockItems.forEach(stockItem => {
                    this.allStockItemsRegistry.set(stockItem.id, stockItem)
                });
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    getAllStockItemsForStockType = (typeId: number) => {
        const stockItems: IStockItem[] = Array.from(this.allStockItemsRegistry.values());
        return stockItems.filter(stockItem => stockItem.typeId === typeId).map(stockItem => {
            return {
                key: stockItem.id,
                text: `${stockItem.name}-${stockItem.itemUnit}${stockItem.unitOfMeasureCode}`,
                value: stockItem.id
            } as ISelectInputOptions
        })
    }
}