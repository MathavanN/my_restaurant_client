import { RootStore } from "./rootStore";
import { runInAction, makeAutoObservable } from "mobx";
import { IRefreshToken, IToken, IUser, IUserLogin } from "../models/user";
import agent from "../api/agent";
import history from '../../history'

export default class UserStore {
    rootStore: RootStore;
    token: IToken | null = null;
    user: IUser | null = null
    loading = false;
    isSuperAdmin = false;
    isAdmin = false;
    isReport = false;
    isNormal = false;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }


    getAccessPolicy(policy: string) {
        return !!this.user?.roles.includes(policy);
    }

    get isSuperAdminUser() {
        return this.getAccessPolicy("SuperAdmin");
    }
    get isAdminUser() {
        return this.getAccessPolicy("Admin");
    }
    get isReportUser() {
        return this.getAccessPolicy("Report");
    }
    get isNormalUser() {
        return this.getAccessPolicy("Normal");
    }
    get isLoggedIn() {
        return !!this.user
    }

    getUser = async () => {
        this.loading = true
        try {
            const user = await agent.Users.current();
            runInAction(() => {
                this.user = user;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.user = null;
                this.loading = false;
            })
        }
    }

    login = async (values: IUserLogin) => {
        try {
            const token = await agent.Users.login(values);
            runInAction(async () => {
                this.token = token;
                this.getUser();
                this.rootStore.commonStore.setToken(token.accessToken)
                this.rootStore.commonStore.setRefreshToken(token.refreshToken)
                this.rootStore.modalStore.closeModal();
            });
            history.push('/test')

        } catch (error) {
            console.log(`Error: ${JSON.stringify(error)}`)
            throw error;
        }
    }

    getRefreshToken = async (token: string) => {
        try {
            const refreshToken: IRefreshToken = { "refreshToken": token };
            const newToken = await agent.Users.refresh(refreshToken);
            runInAction(async () => {
                this.token = newToken;
                //this.getUser();
            })
            this.rootStore.commonStore.setToken(newToken.accessToken)
            this.rootStore.commonStore.setRefreshToken(newToken.refreshToken)

            history.push('/dashboard');


        } catch (error) {
            console.log(`Error: ${JSON.stringify(error)}`)
            throw error;
        }
    }

    logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.rootStore.commonStore.setRefreshToken(null);
        this.user = null
        history.push('/')
    }
}