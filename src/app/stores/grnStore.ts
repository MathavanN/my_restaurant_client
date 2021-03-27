import { computed, makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ApprovalGoodsReceivedNote, CreateGoodsReceivedNote, IGoodsReceivedNote } from '../models/goodsReceivedNote';
import { RootStore } from './rootStore';
import { PENDING } from '../models/constants'
import { CreateGoodsReceivedNoteItem, IGoodsReceivedNoteItem } from '../models/goodsReceivedNoteItem';
import history from '../../history'
import { CreateGoodsReceivedNoteFreeItem } from '../models/goodsReceivedNoteFreeItem';

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
        const sortedGoodsReceivedNotes = this.getSortedGoodsReceivedNotes();

        return Object.entries(sortedGoodsReceivedNotes.reduce((goodsReceivedNotes, grn, i) => {
            goodsReceivedNotes[++i] = grn;
            return goodsReceivedNotes;
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
            history.push(`/grn/manage/${result.id}`);
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

    loadGoodsReceivedNotes = async () => {
        this.loadingInitial = true;
        try {
            const goodReceivedNotes = await agent.GRN.list();
            runInAction(() => {
                goodReceivedNotes.forEach(grn => {
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

    getSortedGoodsReceivedNotes() {
        const goodsReceivedNotes: IGoodsReceivedNote[] = Array.from(this.grnRegistry.values());
        const pendingGoodsReceivedNotes = goodsReceivedNotes.filter(d => d.approvalStatus === PENDING);
        const sortedPendingGoodsReceivedNotes = pendingGoodsReceivedNotes.sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime())
        const otherGoodsReceivedNotes = goodsReceivedNotes.filter(d => d.approvalStatus !== PENDING);
        const sortedOtherGoodsReceivedNotes = otherGoodsReceivedNotes.sort((a, b) => new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime())
        return [...sortedPendingGoodsReceivedNotes, ...sortedOtherGoodsReceivedNotes]
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
                this.updateGRNSummary();
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

        this.grnItemSummaryRegistry.set('total', this.grnItemSummaryRegistry.get('total') + total)
        this.grnItemSummaryRegistry.set('nbt', this.grnItemSummaryRegistry.get('nbt') + nbt)
        this.grnItemSummaryRegistry.set('vat', this.grnItemSummaryRegistry.get('vat') + vat)
        this.grnItemSummaryRegistry.set('discount', this.grnItemSummaryRegistry.get('discount') + discount)
    }

    updateGRNSummary() {
        const itemTotal = (
            this.grnItemSummaryRegistry.get('total') +
            this.grnItemSummaryRegistry.get('nbt') +
            this.grnItemSummaryRegistry.get('vat')) -
            this.grnItemSummaryRegistry.get('discount');

        this.grnItemSummaryRegistry.set('grandTotal', itemTotal)

        if (this.grn) {
            const nbt = (itemTotal * this.grn.nbt) / 100;
            const vat = (itemTotal * this.grn.vat) / 100;
            const discount = (itemTotal * this.grn.discount) / 100;

            this.grnItemSummaryRegistry.set('grnNBT', nbt);
            this.grnItemSummaryRegistry.set('grnVAT', vat);
            this.grnItemSummaryRegistry.set('grnDiscount', discount);
            this.grnItemSummaryRegistry.set('grnGrandTotal', (itemTotal + nbt + vat) - discount);

        }
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