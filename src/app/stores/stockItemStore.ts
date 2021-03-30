/* eslint-disable import/no-cycle */
import { runInAction, makeAutoObservable, computed } from 'mobx';
import { RootStore } from './rootStore';
import { IStockItem, IStockItemSerial } from '../models/stockItem/stockItem';
import { ISelectInputOptions } from '../models/common';
import agent from '../api/agent';
import { LIMIT } from '../models/constants';
import { CreateStockItem } from '../models/stockItem/createStockItem';

export default class StockItemStore {
  rootStore: RootStore;

  stockItem: IStockItem | null = null;

  stockItemRegistry = new Map(); // this is for pagination

  stockItemCount: number = 0;

  page: number = 1;

  loadingInitial = false;

  predicate = new Map();

  allStockItemsRegistry = new Map(); // this to show in dropdown

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @computed get getStockItemTotalPages() {
    return Math.ceil(this.stockItemCount / LIMIT);
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', String(this.page - 1));
    return params;
  }

  setPredicate = (predicate: string, value: string | Date | number) => {
    this.predicate.set(predicate, value);
  };

  setStockItemPage = (page: number) => {
    this.page = page;
  };

  @computed get getStockItems() {
    return Array.from(this.stockItemRegistry.values()).map((stockItem, i) => {
      const item = stockItem as IStockItemSerial;
      runInAction(() => {
        item.serial = LIMIT * (this.page - 1) + i + 1;
      });
      return item;
    });
  }

  loadStockItems = async (typeId: number) => {
    this.stockItemRegistry.clear();
    this.loadingInitial = true;
    try {
      const stockItemEnvelop = await agent.StockItem.list(
        typeId,
        this.axiosParams
      );
      const { stockItems, stockItemCount } = stockItemEnvelop;
      runInAction(() => {
        stockItems.forEach((stockItem) => {
          this.stockItemRegistry.set(stockItem.id, stockItem);
        });
        this.stockItemCount = stockItemCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      throw error;
    }
  };

  loadStockItem = async (id: number) => {
    this.loadingInitial = true;
    try {
      const stockItem = await agent.StockItem.detail(id);
      runInAction(() => {
        this.stockItem = stockItem;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  createStockItem = async (stockItem: CreateStockItem) => {
    const result = await agent.StockItem.create(stockItem);
    runInAction(() => {
      this.stockItemRegistry.set(result.id, result);
    });
  };

  updateStockItem = async (stockItem: CreateStockItem) => {
    const result = await agent.StockItem.update(stockItem);
    runInAction(() => {
      this.stockItemRegistry.set(stockItem.id, result);
    });
  };

  deleteStockItem = async (id: number) => {
    await agent.StockItem.delete(id);
    runInAction(() => {
      this.stockItemRegistry.delete(id);
    });
  };

  loadAllStockItems = async () => {
    const stockItems = await agent.StockItem.listAll();
    runInAction(() => {
      stockItems.forEach((stockItem) => {
        this.allStockItemsRegistry.set(stockItem.id, stockItem);
      });
    });
  };

  getAllStockItemsForStockType = (typeId: number) => {
    const stockItems: IStockItem[] = Array.from(
      this.allStockItemsRegistry.values()
    );
    return stockItems
      .filter((stockItem) => stockItem.typeId === typeId)
      .map(
        (stockItem) =>
        ({
          key: stockItem.id,
          text: `${stockItem.name}-${stockItem.itemUnit}${stockItem.unitOfMeasureCode}`,
          value: stockItem.id,
        } as ISelectInputOptions)
      );
  };
}
