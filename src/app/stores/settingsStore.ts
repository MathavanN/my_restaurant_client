import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ISelectInputOptions } from "../models/common";
import { CreateStockItem, IStockItem } from "../models/stockItem";
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
                text: `${stockItem.name}-${stockItem.itemUnit}${stockItem.unitOfMeasureCode}`,
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

    createSupplier = async (supplier: ISupplier) => {
        try {
            const result = await agent.Supplier.create(supplier);
            runInAction(() => {
                this.supplierRegistry.set(result.id, result)
            })
        } catch (error) {
            throw error;
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

    updateSupplier = async (supplier: ISupplier) => {
        try {
            await agent.Supplier.update(supplier);
            runInAction(() => {
                this.supplierRegistry.set(supplier.id, supplier)
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

    deleteSupplier = async (id: number) => {
        try {
            await agent.Supplier.delete(id);
            runInAction(() => {
                this.supplierRegistry.delete(id);
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

    getSortedSuppliers() {
        const suppliers: ISupplier[] = Array.from(this.supplierRegistry.values());
        return suppliers.sort(
            (a, b) => a.name.toLowerCase() === b.name.toLowerCase() ? 0 : (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
        );
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
            (a, b) => a.type.toLowerCase() === b.type.toLowerCase() ? 0 : (a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1)
        );
    }

    getSortedStockItems() {
        const stockItems: IStockItem[] = Array.from(this.stockItemRegistry.values());
        return stockItems.sort(
            (a, b) => (a.stockType.toLowerCase() === b.stockType.toLowerCase() ? 0 : (a.stockType.toLowerCase() < b.stockType.toLowerCase() ? 1 : -1))
                || (a.name.toLowerCase() === b.name.toLowerCase() ? 0 : (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        );
    }

}