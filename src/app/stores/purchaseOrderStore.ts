import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CreatePurchaseOrder, IPurchaseOrder } from "../models/purchaseOrder";
import { CreatePurchaseOrderItem, IPurchaseOrderItem } from "../models/purchaseOrderItem";
import { RootStore } from "./rootStore";

export default class PurchaseOrderStore {
    rootStore: RootStore;

    purchaseOrder: IPurchaseOrder | null = null;
    purchaseOrderRegistry = new Map();

    purchaseOrderItemRegistry = new Map();

    submitting = false;
    submittingItem = false;
    loadingInitial = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    loadPurchaseOrderItems = async (orderId: number) => {
        this.loadingInitial = true;
        try {
            const params = new URLSearchParams();
            params.append('orderId', String(orderId));
            const items = await agent.PurchaseOrderItem.list(params);
            runInAction(() => {
                items.forEach(item => {
                    this.purchaseOrderItemRegistry.set(item.id, item)
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

    createPurchaseOrderItem = async (item: CreatePurchaseOrderItem) => {
        this.submittingItem = true;
        try {
            const result = await agent.PurchaseOrderItem.create(item);
            const x = await agent.PurchaseOrderItem.detail(result.id);
            runInAction(() => {
                this.purchaseOrderItemRegistry.set(result.id, x)
                this.submittingItem = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submittingItem = false;
            })
        }
    }

    updatePurchaseOrderItem = async (item: CreatePurchaseOrderItem) => {
        this.submittingItem = true;
        try {
            //const result = await agent.PurchaseOrderItem.create(item);
            //const x = await agent.PurchaseOrderItem.detail(result.id);
            runInAction(() => {
                //this.purchaseOrderItemRegistry.set(result.id, x)
                this.submittingItem = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submittingItem = false;
            })
        }
    }

    deletePurchaseOrderItem = async (id: number) => {
        this.submittingItem = true;
        try {
            //await agent.Supplier.delete(id);
            runInAction(() => {
                this.purchaseOrderItemRegistry.delete(id);
                this.submittingItem = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submittingItem = false;
            })
        }
    }
























    @computed get getPurchaseOrderItems() {
        const sortedItems = this.getSortedPurchaseOrderItems();

        return Object.entries(sortedItems.reduce((items, item, i) => {
            items[++i] = item;
            return items;
        }, {} as { [key: number]: IPurchaseOrderItem }));
    }

    @computed get getPurchaseOrders() {
        const sortedOrders = this.getSortedPurchaseOrders();

        return Object.entries(sortedOrders.reduce((orders, order, i) => {
            orders[++i] = order;
            return orders;
        }, {} as { [key: number]: IPurchaseOrder }));
    }

    loadPurchaseOrders = async () => {
        this.loadingInitial = true;
        try {
            const orders = await agent.PurchaseOrder.list();
            runInAction(() => {
                orders.forEach(order => {
                    this.purchaseOrderRegistry.set(order.id, order)
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

    loadPurchaseOrder = async (id: number) => {
        this.loadingInitial = true;
        try {
            const order = await agent.PurchaseOrder.detail(id);
            runInAction(() => {
                this.purchaseOrder = order;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }

    createPurchaseOrder = async (order: CreatePurchaseOrder) => {
        this.submitting = true;
        try {
            const result = await agent.PurchaseOrder.create(order);
            const x = await agent.PurchaseOrder.detail(result.id);
            runInAction(() => {
                this.purchaseOrderRegistry.set(result.id, x)
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    getSortedPurchaseOrders() {
        const orders: IPurchaseOrder[] = Array.from(this.purchaseOrderRegistry.values());
        return orders.sort(
            (a, b) => a.id - b.id
        );
    }

    getSortedPurchaseOrderItems() {
        const items: IPurchaseOrderItem[] = Array.from(this.purchaseOrderItemRegistry.values());
        return items.sort(
            (a, b) => a.id - b.id
        );
    }
}