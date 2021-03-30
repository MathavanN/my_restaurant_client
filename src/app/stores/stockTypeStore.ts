/* eslint-disable import/no-cycle */
import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ISelectInputOptions } from '../models/common';
import { IStockType, IStockTypeSerial } from '../models/stockType/stockType';
import { RootStore } from './rootStore';

export default class StockTypeStore {
  rootStore: RootStore;

  stockType: IStockType | null = null;

  stockTypeRegistry = new Map();

  loadingInitial = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @computed get getStockTypes() {
    return Array.from(this.stockTypeRegistry.values()).map((stockType, i) => {
      const item = stockType as IStockTypeSerial;
      runInAction(() => {
        item.serial = i + 1;
      });
      return item;
    });
  }

  @computed get loadStockTypeOptions() {
    return Array.from(
      this.stockTypeRegistry.values()
    ).map(
      (stockType) =>
      ({
        key: stockType.id,
        text: stockType.type,
        value: stockType.id,
      } as ISelectInputOptions)
    );
  }

  loadStockTypes = async () => {
    this.loadingInitial = true;
    try {
      const stockTypes = await agent.StockType.list();
      runInAction(() => {
        stockTypes.forEach((stockType) => {
          this.stockTypeRegistry.set(stockType.id, stockType);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadStockType = async (id: number) => {
    this.loadingInitial = true;
    try {
      const stockType = await agent.StockType.detail(id);
      runInAction(() => {
        this.stockType = stockType;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      throw error;
    }
  };

  createStockType = async (values: IStockType) => {
    const stockType = await agent.StockType.create(values);
    runInAction(() => {
      this.stockTypeRegistry.set(stockType.id, stockType);
    });
  };

  updateStockType = async (values: IStockType) => {
    const stockType = await agent.StockType.update(values);
    runInAction(() => {
      this.stockTypeRegistry.set(values.id, stockType);
    });
  };

  deleteStockType = async (id: number) => {
    await agent.StockType.delete(id);
    runInAction(() => {
      this.stockTypeRegistry.delete(id);
    });
  };
}
