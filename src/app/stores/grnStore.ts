/* eslint-disable import/no-cycle */
import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import history from '../../history';
import { CreateGoodsReceivedNoteFreeItem } from '../models/goodsReceivedNoteFreeItem/createGoodsReceivedNoteFreeItem';
import { ApprovalGoodsReceivedNote } from '../models/goodsReceivedNote/approvalGoodsReceivedNote';
import {
  IGoodsReceivedNote,
  IGoodsReceivedNoteSerial,
} from '../models/goodsReceivedNote/goodsReceivedNote';
import { CreateGoodsReceivedNote } from '../models/goodsReceivedNote/createGoodsReceivedNote';
import { CreateGoodsReceivedNoteItem } from '../models/goodsReceivedNoteItem/createGoodsReceivedNoteItem';
import { IGoodsReceivedNoteItemSerial } from '../models/goodsReceivedNoteItem/goodsReceivedNoteItem';
import { IGoodsReceivedNoteFreeItemSerial } from '../models/goodsReceivedNoteFreeItem/goodsReceivedNoteFreeItem';
import { Status } from '../models/constants';

export default class GRNStore {
  rootStore: RootStore;

  loadingInitial = false;

  grnRegistry = new Map();

  grn: IGoodsReceivedNote | null = null;

  grnItemRegistry = new Map();

  grnItemSummaryRegistry = new Map();

  grnFreeItemRegistry = new Map();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @computed get getGoodsReceivedNotes() {
    return this.getSortedGoodsReceivedNotes().map((goodsReceivedNote, i) => {
      const item = goodsReceivedNote as IGoodsReceivedNoteSerial;
      runInAction(() => {
        item.serial = i + 1;
      });
      return item;
    });
  }

  createGRN = async (grn: CreateGoodsReceivedNote) => {
    const result = await agent.GRN.create(grn);
    runInAction(() => {
      this.grnRegistry.set(result.id, result);
      this.grn = result;
    });
    this.rootStore.modalStore.closeModal();
    history.push(`/grn/manage/${result.id}`);
  };

  updateGRN = async (grn: CreateGoodsReceivedNote) => {
    const result = await agent.GRN.update(grn);
    runInAction(() => {
      this.grnRegistry.set(grn.id, result);
      this.grn = result;
    });
  };

  approvalGRN = async (grn: ApprovalGoodsReceivedNote) => {
    const result = await agent.GRN.approval(grn);
    runInAction(() => {
      this.grnRegistry.set(grn.id, result);
    });
  };

  loadGoodsReceivedNotes = async () => {
    this.loadingInitial = true;
    try {
      const goodReceivedNotes = await agent.GRN.list();
      runInAction(() => {
        goodReceivedNotes.forEach((grn) => {
          this.grnRegistry.set(grn.id, grn);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadGRN = async (id: number) => {
    this.loadingInitial = true;
    try {
      const grn = await agent.GRN.detail(id);
      runInAction(() => {
        this.grn = grn;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  getSortedGoodsReceivedNotes() {
    const goodsReceivedNotes: IGoodsReceivedNote[] = Array.from(
      this.grnRegistry.values()
    );
    const pendingGoodsReceivedNotes = goodsReceivedNotes.filter(
      (d) => d.approvalStatus === Status.PENDING
    );
    const sortedPendingGoodsReceivedNotes = pendingGoodsReceivedNotes.sort(
      (a, b) =>
        new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime()
    );
    const otherGoodsReceivedNotes = goodsReceivedNotes.filter(
      (d) => d.approvalStatus !== Status.PENDING
    );
    const sortedOtherGoodsReceivedNotes = otherGoodsReceivedNotes.sort(
      (a, b) =>
        new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime()
    );
    return [
      ...sortedPendingGoodsReceivedNotes,
      ...sortedOtherGoodsReceivedNotes,
    ];
  }

  /// /GRN Item related
  loadGRNItems = async (goodsReceivedNoteId: number) => {
    this.loadingInitial = true;
    try {
      const params = new URLSearchParams();
      params.append('goodsReceivedNoteId', String(goodsReceivedNoteId));
      const items = await agent.GRNItem.list(params);
      runInAction(() => {
        this.grnItemRegistry.clear();
        this.createEmptyGRNItemSummary();
        items.forEach((item) => {
          this.grnItemRegistry.set(item.id, item);
          this.updateGRNItemSummary(item);
        });
        this.updateGRNSummary();
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  createEmptyGRNItemSummary() {
    this.grnItemSummaryRegistry.clear();
    this.grnItemSummaryRegistry.set('total', 0);
    this.grnItemSummaryRegistry.set('nbt', 0);
    this.grnItemSummaryRegistry.set('vat', 0);
    this.grnItemSummaryRegistry.set('discount', 0);
    this.grnItemSummaryRegistry.set('grandTotal', 0);
    this.grnItemSummaryRegistry.set('grnNBT', 0);
    this.grnItemSummaryRegistry.set('grnVAT', 0);
    this.grnItemSummaryRegistry.set('grnDiscount', 0);
    this.grnItemSummaryRegistry.set('grnGrandTotal', 0);
  }

  updateGRNItemSummary(item: CreateGoodsReceivedNoteItem) {
    const total = item.itemUnitPrice * item.quantity;
    const nbt = (total * item.nbt) / 100;
    const vat = (total * item.vat) / 100;
    const discount = (total * item.discount) / 100;

    this.grnItemSummaryRegistry.set(
      'total',
      this.grnItemSummaryRegistry.get('total') + total
    );
    this.grnItemSummaryRegistry.set(
      'nbt',
      this.grnItemSummaryRegistry.get('nbt') + nbt
    );
    this.grnItemSummaryRegistry.set(
      'vat',
      this.grnItemSummaryRegistry.get('vat') + vat
    );
    this.grnItemSummaryRegistry.set(
      'discount',
      this.grnItemSummaryRegistry.get('discount') + discount
    );
  }

  updateGRNSummary() {
    const itemTotal =
      this.grnItemSummaryRegistry.get('total') +
      this.grnItemSummaryRegistry.get('nbt') +
      this.grnItemSummaryRegistry.get('vat') -
      this.grnItemSummaryRegistry.get('discount');

    this.grnItemSummaryRegistry.set('grandTotal', itemTotal);

    if (this.grn) {
      const nbt = (itemTotal * this.grn.nbt) / 100;
      const vat = (itemTotal * this.grn.vat) / 100;
      const discount = (itemTotal * this.grn.discount) / 100;

      this.grnItemSummaryRegistry.set('grnNBT', nbt);
      this.grnItemSummaryRegistry.set('grnVAT', vat);
      this.grnItemSummaryRegistry.set('grnDiscount', discount);
      this.grnItemSummaryRegistry.set(
        'grnGrandTotal',
        itemTotal + nbt + vat - discount
      );
    }
  }

  @computed get getGRNItems() {
    return Array.from(this.grnItemRegistry.values()).map(
      (goodsReceivedNoteItem, i) => {
        const item = goodsReceivedNoteItem as IGoodsReceivedNoteItemSerial;
        runInAction(() => {
          item.serial = i + 1;
        });
        return item;
      }
    );
  }

  createGRNItem = async (item: CreateGoodsReceivedNoteItem) => {
    const result = await agent.GRNItem.create(item);
    runInAction(() => {
      this.grnItemRegistry.set(result.id, result);
    });
  };

  updateGRNItem = async (item: CreateGoodsReceivedNoteItem) => {
    const result = await agent.GRNItem.update(item);
    runInAction(() => {
      this.grnItemRegistry.set(item.id, result);
    });
  };

  deleteGRNItem = async (id: number) => {
    await agent.GRNItem.delete(id);
    runInAction(() => {
      this.grnItemRegistry.delete(id);
    });
  };

  /// /GRN Free Item related
  loadGRNFreeItems = async (goodsReceivedNoteId: number) => {
    this.loadingInitial = true;
    try {
      const params = new URLSearchParams();
      params.append('goodsReceivedNoteId', String(goodsReceivedNoteId));
      const items = await agent.GRNFreeItem.list(params);
      runInAction(() => {
        this.grnFreeItemRegistry.clear();
        items.forEach((item) => {
          this.grnFreeItemRegistry.set(item.id, item);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @computed get getGRNFreeItems() {
    return Array.from(this.grnFreeItemRegistry.values()).map(
      (goodsReceivedNoteFreeItem, i) => {
        const item = goodsReceivedNoteFreeItem as IGoodsReceivedNoteFreeItemSerial;
        runInAction(() => {
          item.serial = i + 1;
        });
        return item;
      }
    );
  }

  createGRNFreeItem = async (item: CreateGoodsReceivedNoteFreeItem) => {
    const result = await agent.GRNFreeItem.create(item);
    runInAction(() => {
      this.grnFreeItemRegistry.set(result.id, result);
    });
  };

  updateGRNFreeItem = async (item: CreateGoodsReceivedNoteFreeItem) => {
    const result = await agent.GRNFreeItem.update(item);
    runInAction(() => {
      this.grnFreeItemRegistry.set(item.id, result);
    });
  };

  deleteGRNFreeItem = async (id: number) => {
    await agent.GRNFreeItem.delete(id);
    runInAction(() => {
      this.grnFreeItemRegistry.delete(id);
    });
  };
}
