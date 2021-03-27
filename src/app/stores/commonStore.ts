import { reaction, makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export default class CommonStore {
    rootStore: RootStore;
    token: string | null = window.localStorage.getItem('jwt');
    refreshToken: string | null = window.localStorage.getItem('refreshToken');
    appLoaded = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                }
                else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
        reaction(() => this.refreshToken, refreshToken => {
            if (refreshToken) {
                window.localStorage.setItem('refreshToken', refreshToken)
            }
            else {
                window.localStorage.removeItem('refreshToken')
            }
        })
    }

    getToken = () => {
        this.token = window.localStorage.getItem('jwt');
    }

    setToken = (token: string | null) => {
        this.token = token;
    }
    
    setRefreshToken = (token: string | null) => {
        this.refreshToken = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }
}