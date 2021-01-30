import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export default class GRNStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
}