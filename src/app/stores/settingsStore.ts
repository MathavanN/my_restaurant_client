import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ISelectInputOptions } from "../models/common";
import { IPaymentType } from "../models/paymentType";
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

    paymentType: IPaymentType | null = null;
    paymentTypeRegistry = new Map();

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
        //const sortedUnitOfMeasures = this.getSortedUnitOfMeasures();
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());

        return Object.entries(unitOfMeasures.reduce((unitOfMeasures, unitOfMeasure, i) => {
            unitOfMeasures[++i] = unitOfMeasure;
            return unitOfMeasures;
        }, {} as { [key: number]: IUnitOfMeasure }));
    }

    @computed get getStockTypes() {
        //const sortedStockTypes = this.getSortedStockTypes();
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());

        return Object.entries(stockTypes.reduce((stockTypes, stockType, i) => {
            stockTypes[++i] = stockType;
            return stockTypes;
        }, {} as { [key: number]: IStockType }));
    }

    @computed get getPaymentTypes() {
        const paymentTypes: IPaymentType[] = Array.from(this.paymentTypeRegistry.values());

        return Object.entries(paymentTypes.reduce((paymentTypes, paymentType, i) => {
            paymentTypes[++i] = paymentType;
            return paymentTypes;
        }, {} as { [key: number]: IPaymentType }));
    }


    @computed get loadUnitOfMeasureOptions() {
        //const sortedUnitOfMeasures = this.getSortedUnitOfMeasures()
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());
        return unitOfMeasures.map(unitOfMeasure => {
            return {
                key: unitOfMeasure.id,
                text: unitOfMeasure.code,
                value: unitOfMeasure.id,
            } as ISelectInputOptions;
        });
    }

    @computed get loadStockTypeOptions() {
        //const sortedStockTypes = this.getSortedStockTypes()
        const stockTypes: IStockType[] = Array.from(this.stockTypeRegistry.values());
        return stockTypes.map(stockType => {
            return {
                key: stockType.id,
                text: stockType.type,
                value: stockType.id,
            } as ISelectInputOptions;
        });
    }

    @computed get loadPaymentTypeOptions() {
        const paymentTypes: IPaymentType[] = Array.from(this.paymentTypeRegistry.values());
        return paymentTypes.map(paymentType => {
            return {
                key: paymentType.id,
                text: paymentType.name,
                value: paymentType.id,
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

    loadPaymentTypes = async () => {
        this.loadingInitial = true;
        try {
            const paymentTypes = await agent.PaymentType.list();
            runInAction(() => {
                paymentTypes.forEach(paymentType => {
                    this.paymentTypeRegistry.set(paymentType.id, paymentType)
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

    loadPaymentType = async (id: number) => {
        this.loadingInitial = true;
        try {
            const paymentType = await agent.PaymentType.detail(id);
            runInAction(() => {
                this.paymentType = paymentType;
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

    createPaymentType = async (paymentType: IPaymentType) => {
        try {
            const result = await agent.PaymentType.create(paymentType);
            runInAction(() => {
                this.paymentTypeRegistry.set(result.id, result)
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

    updatePaymentType = async (paymentType: IPaymentType) => {
        try {
            await agent.PaymentType.update(paymentType);
            runInAction(() => {
                this.paymentTypeRegistry.set(paymentType.id, paymentType)
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

    deletePaymentType = async (id: number) => {
        try {
            await agent.PaymentType.delete(id);
            runInAction(() => {
                this.paymentTypeRegistry.delete(id);
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