/* eslint-disable import/no-cycle */
import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ISelectInputOptions } from '../models/common';
import {
  IPaymentType,
  IPaymentTypeSerial,
} from '../models/paymentType/paymentType';
import { RootStore } from './rootStore';

export default class PaymentTypeStore {
  rootStore: RootStore;

  paymentType: IPaymentType | null = null;

  paymentTypeRegistry = new Map();

  loadingInitial = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @computed get getPaymentTypes() {
    return Array.from(this.paymentTypeRegistry.values()).map(
      (paymentType, i) => {
        const item = paymentType as IPaymentTypeSerial;
        runInAction(() => {
          item.serial = i + 1;
        });
        return item;
      }
    );
  }

  @computed get loadPaymentTypeOptions() {
    return Array.from(this.paymentTypeRegistry.values()).map(
      (paymentType) =>
        ({
          key: paymentType.id,
          text: paymentType.name,
          value: paymentType.id,
        } as ISelectInputOptions)
    );
  }

  loadPaymentTypes = async () => {
    this.loadingInitial = true;
    try {
      const paymentTypes = await agent.PaymentType.list();
      runInAction(() => {
        paymentTypes.forEach((paymentType) => {
          this.paymentTypeRegistry.set(paymentType.id, paymentType);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadPaymentType = async (id: number) => {
    this.loadingInitial = true;
    try {
      const paymentType = await agent.PaymentType.detail(id);
      runInAction(() => {
        this.paymentType = paymentType;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  createPaymentType = async (values: IPaymentType) => {
    const paymentType = await agent.PaymentType.create(values);
    runInAction(() => {
      this.paymentTypeRegistry.set(paymentType.id, paymentType);
    });
  };

  updatePaymentType = async (values: IPaymentType) => {
    const paymentType = await agent.PaymentType.update(values);
    runInAction(() => {
      this.paymentTypeRegistry.set(values.id, paymentType);
    });
  };

  deletePaymentType = async (id: number) => {
    await agent.PaymentType.delete(id);
    runInAction(() => {
      this.paymentTypeRegistry.delete(id);
    });
  };
}
