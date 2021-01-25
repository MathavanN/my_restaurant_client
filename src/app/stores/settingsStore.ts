import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ISelectInputOptions } from "../models/common";
import { IStockType } from "../models/stockType";
import { ISupplier } from "../models/supplier";
import { IUnitOfMeasure, UnitOfMeasureFormValues } from "../models/unitOfMeasure";
import { RootStore } from "./rootStore";

export default class SettingsStore {
    rootStore: RootStore;
    activeTab: number = 0;

    unitOfMeasure: IUnitOfMeasure | null = null;
    unitOfMeasureRegistry = new Map();

    stockType: IStockType | null = null;
    stockTypeRegistry = new Map();



    supplier: ISupplier | null = null;
    supplierRegistry = new Map();

    submitting = false;
    loadingInitial = false;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this);
    }

    setActiveTab = (activeIndex: number) => {
        this.activeTab = activeIndex
    }





    @computed get getUnitOfMeasures() {
        const sortedUnitOfMeasures = this.getSortedUnitOfMeasures();

        return Object.entries(sortedUnitOfMeasures.reduce((unitOfMeasures, unitOfMeasure, i) => {
            unitOfMeasures[++i] = unitOfMeasure;
            return unitOfMeasures;
        }, {} as { [key: number]: IUnitOfMeasure }));
    }

    @computed get getStockTypes() {
        const sortedStockTypes = this.getSortedStockTypes();

        return Object.entries(sortedStockTypes.reduce((stockTypes, stockType, i) => {
            stockTypes[++i] = stockType;
            return stockTypes;
        }, {} as { [key: number]: IStockType }));
    }

    

    @computed get loadUnitOfMeasureOptions() {
        const sortedUnitOfMeasures = this.getSortedUnitOfMeasures()
        return sortedUnitOfMeasures.map(unitOfMeasure => {
            return {
                key: unitOfMeasure.id,
                text: unitOfMeasure.code,
                value: unitOfMeasure.id,
            } as ISelectInputOptions;
        });
    }

    @computed get loadStockTypeOptions() {
        const sortedStockTypes = this.getSortedStockTypes()
        return sortedStockTypes.map(stockType => {
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

    loadUnitOfMeasures = async () => {
        this.loadingInitial = true;
        try {
            const uoms = await agent.UnitOfMeasure.list();
            runInAction(() => {
                uoms.forEach(uom => {
                    this.unitOfMeasureRegistry.set(uom.id, uom)
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

    loadUnitOfMeasure = async (id: number) => {
        this.loadingInitial = true;
        try {
            const uom = await agent.UnitOfMeasure.detail(id);
            runInAction(() => {
                this.unitOfMeasure = uom;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }



    

    createStockType = async (stockType: IStockType) => {
        try {
            const result = await agent.StockType.create(stockType);
            runInAction(() => {
                this.stockTypeRegistry.set(result.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    createUnitOfMeasure = async (unitOfMeasure: UnitOfMeasureFormValues) => {
        try {
            const uom = await agent.UnitOfMeasure.create(unitOfMeasure);
            runInAction(() => {
                this.unitOfMeasureRegistry.set(uom.id, uom)
            })
        } catch (error) {
            throw error;
        }
    }

    

    updateStockType = async (stockType: IStockType) => {
        try {
            await agent.StockType.update(stockType);
            runInAction(() => {
                this.stockTypeRegistry.set(stockType.id, stockType)
            })
        } catch (error) {
            throw error;
        }
    }

    updateUnitOfMeasure = async (unitOfMeasure: UnitOfMeasureFormValues) => {
        try {
            await agent.UnitOfMeasure.update(unitOfMeasure);
            runInAction(() => {
                this.unitOfMeasureRegistry.set(unitOfMeasure.id, unitOfMeasure)
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

    deleteUnitOfMeasure = async (id: number) => {
        try {
            await agent.UnitOfMeasure.delete(id);
            runInAction(() => {
                this.unitOfMeasureRegistry.delete(id);
            })
        } catch (error) {
            throw error;
        }
    }





    

    getSortedUnitOfMeasures() {
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());
        return unitOfMeasures.sort(
            (a, b) => 0 - (a.code.toLowerCase() < b.code.toLowerCase() ? 1 : -1)
        );
    }

    getSortedStockTypes() {
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());
        return stockTypes.sort(
            (a, b) => a.type.toLowerCase() === b.type.toLowerCase() ? 0 : (a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1)
        );
    }



}