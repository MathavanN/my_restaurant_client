import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export default class SettingsStore {
    rootStore: RootStore;
    activeTab: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this);
    }

    setActiveTab = (activeIndex: number) => {
        this.activeTab = activeIndex
    }
}