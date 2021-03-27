import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ApprovalPurchaseOrder, CreatePurchaseOrder, IPurchaseOrder } from '../models/purchaseOrder';
import { CreatePurchaseOrderItem, IPurchaseOrderItem } from '../models/purchaseOrderItem';
import { RootStore } from './rootStore';
import history from '../../history'
import { PENDING } from '../models/constants'
import { ISelectInputOptions } from '../models/common';

export default class PurchaseOrderStore {
    rootStore: RootStore;

    purchaseOrder: IPurchaseOrder | null = null;
    purchaseOrderRegistry = new Map();
    purchaseOrderForGRNRegistry = new Map();

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
                this.purchaseOrderItemRegistry.clear();
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
        try {
            const result = await agent.PurchaseOrderItem.create(item);
            runInAction(() => {
                this.purchaseOrderItemRegistry.set(result.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    updatePurchaseOrderItem = async (item: CreatePurchaseOrderItem) => {
        try {
            const result = await agent.PurchaseOrderItem.update(item);
            runInAction(() => {
                this.purchaseOrderItemRegistry.set(item.id, result)
            })
        } catch (error) {
            throw error;
        }
    }


    deletePurchaseOrderItem = async (id: number) => {
        try {
            await agent.PurchaseOrderItem.delete(id);
            runInAction(() => {
                this.purchaseOrderItemRegistry.delete(id);
            })
        } catch (error) {
            throw error;
        }
    }













    @computed get getPurchaseOrderItems() {
        const sortedItems = this.getSortedPurchaseOrderItems();

        return Object.entries(sortedItems.reduce((items, item, i) => {
            items[++i] = item;
            return items;
        }, {} as { [key: number]: IPurchaseOrderItem }));
    }

    @computed get loadApprovedPurchaseOrdersOptions() {
        const orders: IPurchaseOrder[] = Array.from(this.purchaseOrderForGRNRegistry.values());

        return orders.map(order => {
            return {
                key: order.id,
                text: order.orderNumber,
                value: order.id
            } as ISelectInputOptions
        })
    }

    @computed get getPurchaseOrders() {
        const sortedOrders = this.getSortedPurchaseOrders();

        return Object.entries(sortedOrders.reduce((orders, order, i) => {
            orders[++i] = order;
            return orders;
        }, {} as { [key: number]: IPurchaseOrder }));
    }

    loadPOForGRN = async () => {
        try {
            const orders = await agent.PurchaseOrder.listPOForGRN();
            runInAction(() => {
                orders.forEach(order => {
                    this.purchaseOrderForGRNRegistry.set(order.id, order)
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
        try {
            const result = await agent.PurchaseOrder.create(order);
            runInAction(() => {
                this.purchaseOrderRegistry.set(result.id, result)
                this.purchaseOrder = result;
            });
            this.rootStore.modalStore.closeModal();
            history.push(`/purchase/manage/${result.id}`);
        } catch (error) {
            throw error;
        }
    }

    updatePurchaseOrder = async (order: CreatePurchaseOrder) => {
        try {
            const result = await agent.PurchaseOrder.update(order);
            runInAction(() => {
                this.purchaseOrderRegistry.set(order.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    approvalPurchaseOrder = async (order: ApprovalPurchaseOrder) => {
        try {
            const result = await agent.PurchaseOrder.approval(order);
            runInAction(() => {
                this.purchaseOrderRegistry.set(order.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    getSortedPurchaseOrders() {
        const orders: IPurchaseOrder[] = Array.from(this.purchaseOrderRegistry.values());

        const pendingOrders = orders.filter(d => d.approvalStatus === PENDING);
        const sortedPendingOrders = pendingOrders.sort((a, b) => new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime())
        const otherOrders = orders.filter(d => d.approvalStatus !== PENDING);
        const sortedOtherOrders = otherOrders.sort((a, b) => new Date(a.requestedDate).getTime() - new Date(b.requestedDate).getTime())

        return [...sortedPendingOrders, ...sortedOtherOrders]
    }

    getSortedPurchaseOrderItems() {
        const items: IPurchaseOrderItem[] = Array.from(this.purchaseOrderItemRegistry.values());
        return items.sort(
            (a, b) => a.id - b.id
        );
    }
}