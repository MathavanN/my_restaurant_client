import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ApprovalGoodsReceivedNote, CreateGoodsReceivedNote, IGoodsReceivedNote } from "../models/goodsReceivedNote";
import { RootStore } from "./rootStore";
import { PENDING } from '../models/constants'
import { CreateGoodsReceivedNoteItem, IGoodsReceivedNoteItem } from "../models/goodsReceivedNoteItem";
import history from '../../history'
import { CreateGoodsReceivedNoteFreeItem } from "../models/goodsReceivedNoteFreeItem";

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

    @computed get getGRNs() {
        const sortedGRNs = this.getSortedGRNs();

        return Object.entries(sortedGRNs.reduce((grns, grn, i) => {
            grns[++i] = grn;
            return grns;
        }, {} as { [key: number]: IGoodsReceivedNote }));
    }

    createGRN = async (grn: CreateGoodsReceivedNote) => {
        try {
            const result = await agent.GRN.create(grn);
            runInAction(() => {
                this.grnRegistry.set(result.id, result)
                this.grn = result;
            });
            this.rootStore.modalStore.closeModal();
            history.push(`/purchase/manage/${result.id}`);
        } catch (error) {
            throw error;
        }
    }

    updateGRN = async (grn: CreateGoodsReceivedNote) => {
        try {
            const result = await agent.GRN.update(grn);
            runInAction(() => {
                this.grnRegistry.set(grn.id, result)
                this.grn = result;
            })
        } catch (error) {
            throw error;
        }
    }

    approvalGRN = async (grn: ApprovalGoodsReceivedNote) => {
        try {
            const result = await agent.GRN.approval(grn);
            runInAction(() => {
                this.grnRegistry.set(grn.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    loadGRNs = async () => {
        this.loadingInitial = true;
        try {
            const grns = await agent.GRN.list();
            runInAction(() => {
                grns.forEach(grn => {
                    this.grnRegistry.set(grn.id, grn)
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

    loadGRN = async (id: number) => {
        this.loadingInitial = true;
        try {
            const grn = await agent.GRN.detail(id);
            runInAction(() => {
                this.grn = grn;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }

    getSortedGRNs() {
        const grns: IGoodsReceivedNote[] = Array.from(this.grnRegistry.values());

        const pendingGRNs = grns.filter(d => d.approvalStatus === PENDING);
        const sortedPendingGRNs = pendingGRNs.sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime())
        const otherGRNs = grns.filter(d => d.approvalStatus !== PENDING);
        const sortedOtherGRNs = otherGRNs.sort((a, b) => new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime())

        return [...sortedPendingGRNs, ...sortedOtherGRNs]
    }


    ////GRN Item related
    loadGRNItems = async (goodsReceivedNoteId: number) => {
        this.loadingInitial = true;
        try {
            const params = new URLSearchParams();
            params.append('goodsReceivedNoteId', String(goodsReceivedNoteId));
            const items = await agent.GRNItem.list(params);
            runInAction(() => {
                this.grnItemRegistry.clear();
                this.createEmptyGRNItemSummary();
                items.forEach(item => {
                    this.grnItemRegistry.set(item.id, item)
                    this.updateGRNItemSummary(item)
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

    createEmptyGRNItemSummary() {
        this.grnItemSummaryRegistry.clear();
        this.grnItemSummaryRegistry.set('total', 0)
        this.grnItemSummaryRegistry.set('nbt', 0)
        this.grnItemSummaryRegistry.set('vat', 0)
        this.grnItemSummaryRegistry.set('discount', 0)
    }
    updateGRNItemSummary(item: CreateGoodsReceivedNoteItem) {
        const total = item.itemUnitPrice * item.quantity;
        const nbt = (total * item.nbt) / 100;
        const vat = (total * item.vat) / 100;
        const discount = (total * item.discount) / 100;

        this.grnItemSummaryRegistry.set('total', this.grnItemSummaryRegistry.get('total') + total)
        this.grnItemSummaryRegistry.set('nbt', this.grnItemSummaryRegistry.get('nbt') + nbt)
        this.grnItemSummaryRegistry.set('vat', this.grnItemSummaryRegistry.get('vat') + vat)
        this.grnItemSummaryRegistry.set('discount', this.grnItemSummaryRegistry.get('discount') + discount)
    }

    @computed get getGRNItems() {
        const items: IGoodsReceivedNoteItem[] = Array.from(this.grnItemRegistry.values());

        return Object.entries(items.reduce((items, item, i) => {
            items[++i] = item;
            return items;
        }, {} as { [key: number]: IGoodsReceivedNoteItem }));
    }

    createGRNItem = async (item: CreateGoodsReceivedNoteItem) => {
        try {
            const result = await agent.GRNItem.create(item);
            runInAction(() => {
                this.grnItemRegistry.set(result.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    updateGRNItem = async (item: CreateGoodsReceivedNoteItem) => {
        try {
            const result = await agent.GRNItem.update(item);
            runInAction(() => {
                this.grnItemRegistry.set(item.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    deleteGRNItem = async (id: number) => {
        try {
            await agent.GRNItem.delete(id);
            runInAction(() => {
                this.grnItemRegistry.delete(id);
            })
        } catch (error) {
            throw error;
        }
    }

    ////GRN Free Item related

    loadGRNFreeItems = async (goodsReceivedNoteId: number) => {
        this.loadingInitial = true;
        try {
            const params = new URLSearchParams();
            params.append('goodsReceivedNoteId', String(goodsReceivedNoteId));
            const items = await agent.GRNFreeItem.list(params);
            runInAction(() => {
                this.grnFreeItemRegistry.clear();
                items.forEach(item => {
                    this.grnFreeItemRegistry.set(item.id, item)
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

    @computed get getGRNFreeItems() {
        const items: IGoodsReceivedNoteItem[] = Array.from(this.grnFreeItemRegistry.values());

        return Object.entries(items.reduce((items, item, i) => {
            items[++i] = item;
            return items;
        }, {} as { [key: number]: IGoodsReceivedNoteItem }));
    }

    createGRNFreeItem = async (item: CreateGoodsReceivedNoteFreeItem) => {
        try {
            const result = await agent.GRNFreeItem.create(item);
            runInAction(() => {
                this.grnFreeItemRegistry.set(result.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    updateGRNFreeItem = async (item: CreateGoodsReceivedNoteFreeItem) => {
        try {
            const result = await agent.GRNFreeItem.update(item);
            runInAction(() => {
                this.grnFreeItemRegistry.set(item.id, result)
            })
        } catch (error) {
            throw error;
        }
    }

    deleteGRNFreeItem = async (id: number) => {
        try {
            await agent.GRNFreeItem.delete(id);
            runInAction(() => {
                this.grnFreeItemRegistry.delete(id);
            })
        } catch (error) {
            throw error;
        }
    }
}