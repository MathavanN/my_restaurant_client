import { computed, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CreateGoodsReceivedNote, IGoodsReceivedNote } from "../models/goodsReceivedNote";
import { RootStore } from "./rootStore";
import { APPROVED, PENDING } from '../models/constants'
import { IGoodsReceivedNoteItem } from "../models/goodsReceivedNoteItem";

export default class GRNStore {
    rootStore: RootStore;

    loadingInitial = false;
    grnRegistry = new Map();
    grn: IGoodsReceivedNote | null = null;

    grnItemRegistry = new Map();
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
            //const x = await agent.PurchaseOrder.detail(result.id);
            runInAction(() => {
                //this.purchaseOrderRegistry.set(result.id, x)
                //this.purchaseOrder = x;
            });
            this.rootStore.modalStore.closeModal();
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
        console.log(goodsReceivedNoteId);
        this.loadingInitial = true;
        try {
            const params = new URLSearchParams();
            params.append('goodsReceivedNoteId', String(goodsReceivedNoteId));
            const items = await agent.GRNItem.list(params);
            runInAction(() => {
                this.grnItemRegistry.clear();
                items.forEach(item => {
                    this.grnItemRegistry.set(item.id, item)
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

    @computed get getGRNItems() {
        const items: IGoodsReceivedNoteItem[] = Array.from(this.grnItemRegistry.values());

        return Object.entries(items.reduce((items, item, i) => {
            items[++i] = item;
            return items;
        }, {} as { [key: number]: IGoodsReceivedNoteItem }));
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
}