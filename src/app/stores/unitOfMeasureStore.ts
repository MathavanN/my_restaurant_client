import { computed, makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent';
import { ISelectInputOptions } from '../models/common';
import { IUnitOfMeasure } from '../models/unitOfMeasure';
import { RootStore } from './rootStore'
import { UnitOfMeasureFormValues } from '../models/unitOfMeasureFormValues'

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
        const items: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());

        return Object.entries(items.reduce((unitOfMeasures, unitOfMeasure, i) => {
            unitOfMeasures[++i] = unitOfMeasure;
            return unitOfMeasures;
        }, {} as { [key: number]: IUnitOfMeasure }));
    }

    @computed get loadUnitOfMeasureOptions() {
        const unitOfMeasures: IUnitOfMeasure[] = Array.from(this.unitOfMeasureRegistry.values());
        return unitOfMeasures.map(unitOfMeasure => ({
            key: unitOfMeasure.id,
            text: unitOfMeasure.code,
            value: unitOfMeasure.id,
        } as ISelectInputOptions));
    }

    loadUnitOfMeasures = async () => {
        this.loadingInitial = true;
        try {
            const unitOfMeasures = await agent.UnitOfMeasure.list();
            runInAction(() => {
                unitOfMeasures.forEach(item => this.unitOfMeasureRegistry.set(item.id, item));
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
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
        }
    }

    createUnitOfMeasure = async (values: UnitOfMeasureFormValues) => {
        const unitOfMeasure = await agent.UnitOfMeasure.create(values);
        runInAction(() => {
            this.unitOfMeasureRegistry.set(unitOfMeasure.id, unitOfMeasure)
        })
    }

    updateUnitOfMeasure = async (values: UnitOfMeasureFormValues) => {
        const unitOfMeasure = await agent.UnitOfMeasure.update(values);
        runInAction(() => {
            this.unitOfMeasureRegistry.set(values.id, unitOfMeasure)
        })
    }

    deleteUnitOfMeasure = async (id: number) => {
        await agent.UnitOfMeasure.delete(id);
        runInAction(() => {
            this.unitOfMeasureRegistry.delete(id);
        })
    }
}