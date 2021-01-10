import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CreatePurchaseOrder, IPurchaseOrder } from "../models/purchaseOrder";
import { RootStore } from "./rootStore";

export default class PurchaseOrderStore {
    rootStore: RootStore;

    purchaseOrder: IPurchaseOrder | null = null;
    purchaseOrderRegistry = new Map();

    submitting = false;
    loadingInitial = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
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
            const orders = await agent.PurchaseOrder.listOrders();
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
            const order = await agent.PurchaseOrder.orderDetails(id);
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
            const result = await agent.PurchaseOrder.createOrder(order);
            const x = await agent.PurchaseOrder.orderDetails(result.id);
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
}