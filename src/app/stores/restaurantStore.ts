/* eslint-disable import/no-cycle */
import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export default class RestaurantStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}
