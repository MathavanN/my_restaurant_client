import { RootStore } from './rootStore';
import { runInAction, makeAutoObservable } from 'mobx';

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
