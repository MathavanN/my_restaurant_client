import { createContext } from "react";
import { configure } from "mobx";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import RestaurantStore from "./restaurantStore";
import SettingsStore from "./settingsStore";
import PurchaseOrderStore from "./purchaseOrderStore";
import StockItemStore from "./stockItemStore";
import SupplierStore from "./supplierStore";
import GRNStore from "./grnStore";

configure({ enforceActions: 'always' })

export class RootStore {
    userStore: UserStore
    commonStore: CommonStore
    modalStore: ModalStore;
    restaurantStore: RestaurantStore;
    settingsStore: SettingsStore;
    purchaseOrderStore: PurchaseOrderStore;
    stockItemStore: StockItemStore
    supplierStore: SupplierStore;
    grnStore: GRNStore;

    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this)
        this.modalStore = new ModalStore(this)
        this.restaurantStore = new RestaurantStore(this);
        this.settingsStore = new SettingsStore(this);
        this.purchaseOrderStore = new PurchaseOrderStore(this);
        this.stockItemStore = new StockItemStore(this);
        this.supplierStore = new SupplierStore(this)
        this.grnStore = new GRNStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())