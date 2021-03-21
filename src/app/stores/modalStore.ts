import { runInAction, makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export default class ModalStore {
    rootStore: RootStore;
    modal = {
        open: false,
        body: null
    };

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this)
    }

    openModal = (content: any) => {
        runInAction(() => {
            this.modal.open = true;
            this.modal.body = content;
        });
    };

    closeModal = () => {
        runInAction(() => {
            this.modal.open = false;
            this.modal.body = null;
        });
    };
}
