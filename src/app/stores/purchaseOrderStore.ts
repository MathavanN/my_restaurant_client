/* eslint-disable import/no-cycle */
import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IPurchaseOrder, IPurchaseOrderSerial } from '../models/purchaseOrder';
import { IPurchaseOrderItem, IPurchaseOrderItemSerial } from '../models/purchaseOrderItem';
import { RootStore } from './rootStore';
import history from '../../history';
import { PENDING } from '../models/constants';
import { ISelectInputOptions } from '../models/common';
import { ApprovalPurchaseOrder } from '../models/approvalPurchaseOrder';
import { CreatePurchaseOrder } from '../models/createPurchaseOrder';
import { CreatePurchaseOrderItem } from '../models/createPurchaseOrderItem';

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
        items.forEach((item) => {
          this.purchaseOrderItemRegistry.set(item.id, item);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  createPurchaseOrderItem = async (item: CreatePurchaseOrderItem) => {
    const result = await agent.PurchaseOrderItem.create(item);
    runInAction(() => {
      this.purchaseOrderItemRegistry.set(result.id, result);
    });
  };

  updatePurchaseOrderItem = async (item: CreatePurchaseOrderItem) => {
    const result = await agent.PurchaseOrderItem.update(item);
    runInAction(() => {
      this.purchaseOrderItemRegistry.set(item.id, result);
    });
  };

  deletePurchaseOrderItem = async (id: number) => {
    await agent.PurchaseOrderItem.delete(id);
    runInAction(() => {
      this.purchaseOrderItemRegistry.delete(id);
    });
  };

  @computed get getPurchaseOrderItems() {
    return this.getSortedPurchaseOrderItems().map((orderItem, i) => {
      const item = orderItem as IPurchaseOrderItemSerial;
      runInAction(() => {
        item.serial = i + 1;
      });
      return item;
    });
  }

  @computed get loadApprovedPurchaseOrdersOptions() {
    const orders: IPurchaseOrder[] = Array.from(
      this.purchaseOrderForGRNRegistry.values()
    );

    return orders.map(
      (order) =>
      ({
        key: order.id,
        text: order.orderNumber,
        value: order.id,
      } as ISelectInputOptions)
    );
  }

  @computed get getPurchaseOrders() {
    return this.getSortedPurchaseOrders().map((order, i) => {
      const item = order as IPurchaseOrderSerial;
      runInAction(() => {
        item.serial = i + 1;
      });
      return item;
    });
  }

  loadPOForGRN = async () => {
    try {
      const orders = await agent.PurchaseOrder.listPOForGRN();
      runInAction(() => {
        orders.forEach((order) => {
          this.purchaseOrderForGRNRegistry.set(order.id, order);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadPurchaseOrders = async () => {
    this.loadingInitial = true;
    try {
      const orders = await agent.PurchaseOrder.list();
      runInAction(() => {
        orders.forEach((order) => {
          this.purchaseOrderRegistry.set(order.id, order);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadPurchaseOrder = async (id: number) => {
    this.loadingInitial = true;
    try {
      const order = await agent.PurchaseOrder.detail(id);
      runInAction(() => {
        this.purchaseOrder = order;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  createPurchaseOrder = async (order: CreatePurchaseOrder) => {
    const result = await agent.PurchaseOrder.create(order);
    runInAction(() => {
      this.purchaseOrderRegistry.set(result.id, result);
      this.purchaseOrder = result;
    });
    this.rootStore.modalStore.closeModal();
    history.push(`/purchase/manage/${result.id}`);
  };

  updatePurchaseOrder = async (order: CreatePurchaseOrder) => {
    const result = await agent.PurchaseOrder.update(order);
    runInAction(() => {
      this.purchaseOrderRegistry.set(order.id, result);
    });
  };

  approvalPurchaseOrder = async (order: ApprovalPurchaseOrder) => {
    const result = await agent.PurchaseOrder.approval(order);
    runInAction(() => {
      this.purchaseOrderRegistry.set(order.id, result);
    });
  };

  getSortedPurchaseOrders() {
    const orders: IPurchaseOrder[] = Array.from(
      this.purchaseOrderRegistry.values()
    );
    const pendingOrders = orders.filter((d) => d.approvalStatus === PENDING);
    const sortedPendingOrders = pendingOrders.sort(
      (a, b) =>
        new Date(b.requestedDate).getTime() -
        new Date(a.requestedDate).getTime()
    );
    const otherOrders = orders.filter((d) => d.approvalStatus !== PENDING);
    const sortedOtherOrders = otherOrders.sort(
      (a, b) =>
        new Date(a.requestedDate).getTime() -
        new Date(b.requestedDate).getTime()
    );

    return [...sortedPendingOrders, ...sortedOtherOrders];
  }

  getSortedPurchaseOrderItems() {
    const items: IPurchaseOrderItem[] = Array.from(
      this.purchaseOrderItemRegistry.values()
    );
    return items.sort((a, b) => a.id - b.id);
  }
}
