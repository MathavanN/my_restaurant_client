import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ISelectInputOptions } from "../models/common";
import { CreateStockItem, IStockItem } from "../models/stockItem";
import { IStockType } from "../models/stockType";
import { ISupplier } from "../models/supplier";
import { IUnitOfMeasure } from "../models/unitOfMeasure";
import { RootStore } from "./rootStore";

export default class SettingsStore {
    rootStore: RootStore;
    activeTab: number = 0;

    unitOfMeasure: IUnitOfMeasure | null = null;
    unitOfMeasureRegistry = new Map();

    stockType: IStockType | null = null;
    stockTypeRegistry = new Map();

    stockItem: IStockItem | null = null;
    stockItemRegistry = new Map();

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

    @computed get getSuppliers() {
        const sortedStockTypes = this.getSortedSuppliers();

        return Object.entries(sortedStockTypes.reduce((suppliers, supplier, i) => {
            suppliers[++i] = supplier;
            return suppliers;
        }, {} as { [key: number]: ISupplier }));
    }

    @computed get getStockItems() {
        const sortedStockItems = this.getSortedStockItems();

        return Object.entries(sortedStockItems.reduce((stockItems, stockItem, i) => {
            stockItems[++i] = stockItem;
            return stockItems;
        }, {} as { [key: number]: IStockItem }));
    }

    @computed get loadSupplierOptions() {
        const sortedSuppliers = this.getSortedSuppliers()
        return sortedSuppliers.map(supplier => {
            return {
                key: supplier.id,
                text: supplier.name,
                value: supplier.id,
            } as ISelectInputOptions;
        });
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

    @computed get loadStockItemOptions() {
        const sortedStockItems = this.getSortedStockItems();
        return sortedStockItems.map(stockItem => {
            return {
                key: stockItem.id,
                text: stockItem.name,
                value: stockItem.id
            } as ISelectInputOptions
        })
    }

    loadSuppliers = async () => {
        this.loadingInitial = true;
        try {
            const suppliers = await agent.Supplier.list();
            runInAction(() => {
                suppliers.forEach(supplier => {
                    this.supplierRegistry.set(supplier.id, supplier)
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

    loadStockItems = async () => {
        this.loadingInitial = true;
        try {
            const stockItems = await agent.StockItem.list();
            runInAction(() => {
                stockItems.forEach(stockItem => {
                    this.stockItemRegistry.set(stockItem.id, stockItem)
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

    loadSupplier = async (id: number) => {
        this.loadingInitial = true;
        try {
            const supplier = await agent.Supplier.detail(id);
            runInAction(() => {
                this.supplier = supplier;
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
        this.submitting = true;
        try {
            const result = await agent.StockItem.create(stockItem);
            const x = await agent.StockItem.detail(result.id);
            runInAction(() => {
                this.stockItemRegistry.set(result.id, x)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    updateStockItem = async (stockItem: CreateStockItem) => {
        this.submitting = true;
        try {
            await agent.StockItem.update(stockItem);
            runInAction(() => {
                this.stockItemRegistry.set(stockItem.id, stockItem)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    createSupplier = async (supplier: ISupplier) => {
        this.submitting = true;
        try {
            const result = await agent.Supplier.create(supplier);
            runInAction(() => {
                this.supplierRegistry.set(result.id, result)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    createStockType = async (stockType: IStockType) => {
        this.submitting = true;
        try {
            const result = await agent.StockType.create(stockType);
            runInAction(() => {
                this.stockTypeRegistry.set(result.id, result)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    createUnitOfMeasure = async (unitOfMeasure: IUnitOfMeasure) => {
        this.submitting = true;
        try {
            const uom = await agent.UnitOfMeasure.create(unitOfMeasure);
            runInAction(() => {
                this.unitOfMeasureRegistry.set(uom.id, uom)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    updateSupplier = async (supplier: ISupplier) => {
        this.submitting = true;
        try {
            await agent.Supplier.update(supplier);
            runInAction(() => {
                this.supplierRegistry.set(supplier.id, supplier)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    updateStockType = async (stockType: IStockType) => {
        this.submitting = true;
        try {
            await agent.StockType.update(stockType);
            runInAction(() => {
                this.stockTypeRegistry.set(stockType.id, stockType)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    updateUnitOfMeasure = async (unitOfMeasure: IUnitOfMeasure) => {
        this.submitting = true;
        try {
            await agent.UnitOfMeasure.update(unitOfMeasure);
            runInAction(() => {
                this.unitOfMeasureRegistry.set(unitOfMeasure.id, unitOfMeasure)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    deleteSupplier = async (id: number) => {
        this.submitting = true;
        try {
            await agent.Supplier.delete(id);
            runInAction(() => {
                this.supplierRegistry.delete(id);
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    deleteStockType = async (id: number) => {
        this.submitting = true;
        try {
            await agent.StockType.delete(id);
            runInAction(() => {
                this.stockTypeRegistry.delete(id);
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    deleteUnitOfMeasure = async (id: number) => {
        this.submitting = true;
        try {
            await agent.UnitOfMeasure.delete(id);
            runInAction(() => {
                this.unitOfMeasureRegistry.delete(id);
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    deleteStockItem = async (id: number) => {
        this.submitting = true;
        try {
            await agent.StockItem.delete(id);
            runInAction(() => {
                this.stockItemRegistry.delete(id);
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }









    getSortedSuppliers() {
        const suppliers: ISupplier[] = Array.from(this.supplierRegistry.values());
        return suppliers.sort(
            (a, b) => a.id - b.id
        );
    }

    getSortedUnitOfMeasures() {
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());
        return unitOfMeasures.sort(
            (a, b) => a.id - b.id
        );
    }

    getSortedStockTypes() {
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());
        return stockTypes.sort(
            (a, b) => a.id - b.id
        );
    }

    getSortedStockItems() {
        const stockItems: IStockItem[] = Array.from(this.stockItemRegistry.values());
        return stockItems.sort(
            (a, b) => a.id - b.id
        );
    }

}