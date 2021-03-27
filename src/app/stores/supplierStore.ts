import { runInAction, makeAutoObservable, computed } from 'mobx';
import { RootStore } from './rootStore';
import { ISupplier } from '../models/supplier';
import agent from '../api/agent';
import { ISelectInputOptions } from '../models/common';
import { LIMIT } from '../models/constants'

export default class SupplierStore {
    rootStore: RootStore;

    supplier: ISupplier | null = null;

    supplierRegistry = new Map(); // this is for pagination

    supplierCount: number = 0;

    page: number = 1;

    loadingInitial = false;

    predicate = new Map();
    
    allSupplierRegistry = new Map();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    @computed get getSupplierTotalPages() {
        return Math.ceil(this.supplierCount / LIMIT);
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', String(this.page - 1));
        this.predicate.forEach((value, key) => {
            params.append(key, value)
        })
        return params
    }

    setPredicate = (predicate: string, value: string | Date | number) => {
        this.predicate.set(predicate, value)
    }

    setSupplierPage = (page: number) => {
        this.page = page;
    }


    @computed get getSuppliers() {
        const suppliers: ISupplier[] = Array.from(this.supplierRegistry.values());

        return Object.entries(suppliers.reduce((suppliers, supplier, i) => {
            const serialNumber = LIMIT * (this.page - 1) + i + 1;
            suppliers[serialNumber] = supplier;
            return suppliers;
        }, {} as { [key: number]: ISupplier }));
    }



    @computed get loadSupplierOptions() {
        const suppliers: ISupplier[] = Array.from(this.allSupplierRegistry.values());
        return suppliers.map(supplier => {
            return {
                key: supplier.id,
                text: supplier.name,
                value: supplier.id,
            } as ISelectInputOptions;
        });
    }

    loadSuppliers = async () => {
        this.supplierRegistry.clear();
        this.loadingInitial = true;
        try {
            const supplierEnvelop = await agent.Supplier.list(this.axiosParams)
            const { suppliers, supplierCount } = supplierEnvelop;
            runInAction(() => {
                suppliers.forEach(supplier => {
                    this.supplierRegistry.set(supplier.id, supplier)
                });
                this.supplierCount = supplierCount;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            throw error;
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

    updateSupplier = async (supplier: ISupplier) => {
        try {
            const result = await agent.Supplier.update(supplier);
            runInAction(() => {
                this.supplierRegistry.set(supplier.id, result)
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

    loadAllSuppliers = async () => {
        this.allSupplierRegistry.clear();
        try {
            const supplierEnvelop = await agent.Supplier.list(new URLSearchParams())
            const { suppliers } = supplierEnvelop;
            runInAction(() => {
                suppliers.forEach(supplier => {
                    this.allSupplierRegistry.set(supplier.id, supplier)
                });
            })
        }
        catch (error) {
            throw error;
        }
    }

}