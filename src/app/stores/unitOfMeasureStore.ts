import { computed, makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { ISelectInputOptions } from "../models/common";
import { IUnitOfMeasure, UnitOfMeasureFormValues } from "../models/unitOfMeasure";
import { RootStore } from "./rootStore"

export default class UnitOfMeasureStore {
    rootStore: RootStore;
    unitOfMeasure: IUnitOfMeasure | null = null;
    unitOfMeasureRegistry = new Map();
    loadingInitial = false;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    @computed get getUnitOfMeasures() {
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());

        return Object.entries(unitOfMeasures.reduce((unitOfMeasures, unitOfMeasure, i) => {
            unitOfMeasures[++i] = unitOfMeasure;
            return unitOfMeasures;
        }, {} as { [key: number]: IUnitOfMeasure }));
    }

    @computed get loadUnitOfMeasureOptions() {
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());
        return unitOfMeasures.map(unitOfMeasure => {
            return {
                key: unitOfMeasure.id,
                text: unitOfMeasure.code,
                value: unitOfMeasure.id,
            } as ISelectInputOptions;
        });
    }

    loadUnitOfMeasures = async () => {
        this.loadingInitial = true;
        try {
            const unitOfMeasures = await agent.UnitOfMeasure.list();
            runInAction(() => {
                unitOfMeasures.forEach(unitOfMeasure => {
                    this.unitOfMeasureRegistry.set(unitOfMeasure.id, unitOfMeasure)
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

    loadUnitOfMeasure = async (id: number) => {
        this.loadingInitial = true;
        try {
            const unitOfMeasure = await agent.UnitOfMeasure.detail(id);
            runInAction(() => {
                this.unitOfMeasure = unitOfMeasure;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }

    createUnitOfMeasure = async (values: UnitOfMeasureFormValues) => {
        try {
            const unitOfMeasure = await agent.UnitOfMeasure.create(values);
            runInAction(() => {
                this.unitOfMeasureRegistry.set(unitOfMeasure.id, unitOfMeasure)
            })
        } catch (error) {
            throw error;
        }
    }

    updateUnitOfMeasure = async (values: UnitOfMeasureFormValues) => {
        try {
            const unitOfMeasure = await agent.UnitOfMeasure.update(values);
            runInAction(() => {
                this.unitOfMeasureRegistry.set(values.id, unitOfMeasure)
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

    // getSortedUnitOfMeasures() {
    //     const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());
    //     return unitOfMeasures.sort(
    //         (a, b) => 0 - (a.code.toLowerCase() < b.code.toLowerCase() ? 1 : -1)
    //     );
    // }

}