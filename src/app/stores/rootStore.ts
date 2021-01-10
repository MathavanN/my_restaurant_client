import { createContext } from "react";
import { configure } from "mobx";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import RestaurantStore from "./restaurantStore";
import SettingsStore from "./settingsStore";
import PurchaseOrderStore from "./purchaseOrderStore";

configure({ enforceActions: 'always' })

export class RootStore {
    userStore: UserStore
    commonStore: CommonStore
    modalStore: ModalStore;
    restaurantStore: RestaurantStore;
    settingsStore: SettingsStore;
    purchaseOrderStore: PurchaseOrderStore;

    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this)
        this.modalStore = new ModalStore(this)
        this.restaurantStore = new RestaurantStore(this);
        this.settingsStore = new SettingsStore(this);
        this.purchaseOrderStore = new PurchaseOrderStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore())