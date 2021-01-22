import { RootStore } from "./rootStore";
import { runInAction, makeAutoObservable, computed, reaction } from "mobx";
import { CreateStockItem, IStockItem } from "../models/stockItem";
import { ISelectInputOptions } from "../models/common";
import agent from "../api/agent";

const LIMIT = 10;
export default class StockItemStore {
    
    rootStore: RootStore;
    stockItem: IStockItem | null = null;
    stockItemRegistry = new Map();
    stockItemCount: number = 0;
    page: number = 1;
    loadingInitial = false;
    predicate = new Map();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.stockItemRegistry.clear();
                this.loadStockItems1();
            }
        )
        makeAutoObservable(this)
    }

    @computed get getStockItemTotalPages() {
        console.log(this.stockItemCount);
        console.log(this.stockItemCount / LIMIT)
        return Math.ceil(this.stockItemCount / LIMIT);
    }

    setPredicate = (predicate: string, value: string | Date | number) => {
        this.predicate.set(predicate, value)
    }

    setStockItemPage = (page: number) => {
        console.log(page)
        this.page = page;
    }

    @computed get getStockItems() {
        const sortedStockItems = this.getSortedStockItems();

        return Object.entries(sortedStockItems.reduce((stockItems, stockItem, i) => {
            stockItems[++i] = stockItem;
            return stockItems;
        }, {} as { [key: number]: IStockItem }));
    }

    @computed get loadStockItemOptions() {
        const sortedStockItems = this.getSortedStockItems();
        return sortedStockItems.map(stockItem => {
            return {
                key: stockItem.id,
                text: `${stockItem.name}-${stockItem.itemUnit}${stockItem.unitOfMeasureCode}`,
                value: stockItem.id
            } as ISelectInputOptions
        })
    }

    loadStockItems1 = async () => {
        this.stockItemRegistry.clear();
        this.loadingInitial = true;
        try {
            const stockItems = await agent.StockItem.list();
            runInAction(() => {
                if (this.predicate.has("typeId")) {
                    const filteredData = stockItems.filter(d => d.typeId === this.predicate.get("typeId"));
                    this.stockItemCount = filteredData.length;
                    const paginationData = filteredData.splice(((this.page - 1) * LIMIT), LIMIT);
                    paginationData.forEach(stockItem => {
                        this.stockItemRegistry.set(stockItem.id, stockItem)
                    });
                }
                else {
                    this.stockItemCount = stockItems.length;
                    const x = stockItems.splice(((this.page - 1) * LIMIT), LIMIT)
                    x.forEach(stockItem => {
                        this.stockItemRegistry.set(stockItem.id, stockItem)
                    });
                    this.loadingInitial = false;
                }
            })
        }
        catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    loadStockItems = async () => {
        this.loadingInitial = true;
        try {
            const stockItems = await agent.StockItem.list();
            const x = stockItems.splice(((this.page - 1) * LIMIT), LIMIT)
            runInAction(() => {
                this.stockItemRegistry.clear();
                x.forEach(stockItem => {
                    this.stockItemRegistry.set(stockItem.id, stockItem)
                });
                this.stockItemCount = stockItems.length + x.length;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
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

    getFilteredStockItems = (stockTypeId: number) => {
        const sortedStockItems = this.getSortedStockItems();
        return sortedStockItems.filter(stockItem => stockItem.typeId === stockTypeId).map(stockItem => {
            return {
                key: stockItem.id,
                text: `${stockItem.name}-${stockItem.itemUnit}${stockItem.unitOfMeasureCode}`,
                value: stockItem.id
            } as ISelectInputOptions
        })
    }

    getSortedStockItems() {
        const stockItems: IStockItem[] = Array.from(this.stockItemRegistry.values());
        return stockItems.sort(
            (a, b) => (a.stockType.toLowerCase() === b.stockType.toLowerCase() ? 0 : (a.stockType.toLowerCase() < b.stockType.toLowerCase() ? 1 : -1))
                || (a.name.toLowerCase() === b.name.toLowerCase() ? 0 : (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        );
    }
}