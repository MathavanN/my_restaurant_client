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
import UnitOfMeasureStore from "./unitOfMeasureStore";
import StockTypeStore from "./stockTypeStore";
import PaymentTypeStore from "./paymentTypeStore";

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
    unitOfMeasureStore: UnitOfMeasureStore;
    stockTypeStore: StockTypeStore;
    paymentTypeStore: PaymentTypeStore;

    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this)
        this.modalStore = new ModalStore(this)
        this.restaurantStore = new RestaurantStore(this);
        this.settingsStore = new SettingsStore(this);
        this.purchaseOrderStore = new PurchaseOrderStore(this);
        this.stockItemStore = new StockItemStore(this);
        this.supplierStore = new SupplierStore(this);
        this.grnStore = new GRNStore(this);
        this.unitOfMeasureStore = new UnitOfMeasureStore(this);
        this.stockTypeStore = new StockTypeStore(this);
        this.paymentTypeStore = new PaymentTypeStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore())