import { RootStore } from "./rootStore";
import { runInAction, makeAutoObservable, computed } from "mobx";
import { IAppUser, IRefreshToken, IToken, IUser, IUserLogin } from "../models/user";
import agent from "../api/agent";
import history from '../../history'
import { SUPER_ADMIN, ADMIN, NORMAL, REPORT } from '../models/constants'
import { ISelectGuidInputOptions } from "../models/common";

export default class UserStore {
    rootStore: RootStore;
    token: IToken | null = null;
    user: IUser | null = null
    loading = false;
    isSuperAdmin = false;
    isAdmin = false;
    isReport = false;
    isNormal = false;

    appUsersRegistry = new Map();
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }


    getAccessPolicy(policy: string) {
        return !!this.user?.roles.includes(policy);
    }

    get isSuperAdminUser() {
        return this.getAccessPolicy(SUPER_ADMIN);
    }
    get isAdminUser() {
        return this.getAccessPolicy(ADMIN);
    }
    get isReportUser() {
        return this.getAccessPolicy(REPORT);
    }
    get isNormalUser() {
        return this.getAccessPolicy(NORMAL);
    }
    get isLoggedIn() {
        return !!this.user
    }

    get hasModifyAccess() {
        return this.getAccessPolicy(SUPER_ADMIN) || this.getAccessPolicy(ADMIN);
    }

    loadAppUsers = async () => {
        this.loading = true
        try {
            const users = await agent.Users.list();
            runInAction(() => {
                users.forEach(user => {
                    this.appUsersRegistry.set(user.id, user)
                });
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    getSortedAppUsers() {
        const users: IAppUser[] = Array.from(this.appUsersRegistry.values());
        return users.sort(
            (a, b) => (a.firstName.toLowerCase() === b.firstName.toLowerCase() ? 0 : (a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1))
                || (a.lastName.toLowerCase() === b.lastName.toLowerCase() ? 0 : (a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1))
        );
    }

    @computed get getAppUsers() {
        const sortedAppUsers = this.getSortedAppUsers();

        return Object.entries(sortedAppUsers.reduce((users, user, i) => {
            users[++i] = user;
            return users;
        }, {} as { [key: number]: IAppUser }));
    }

    @computed get loadAppUsersOptions() {
        const sortedAppUsers = this.getSortedAppUsers();
        return sortedAppUsers.map(user => {
            return {
                key: user.id,
                text: `${user.firstName} ${user.lastName}`,
                value: user.id
            } as ISelectGuidInputOptions
        })
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
                //this.getUser();
                this.rootStore.commonStore.setToken(token.accessToken)
                this.rootStore.commonStore.setRefreshToken(token.refreshToken)
                this.rootStore.modalStore.closeModal();
            });
            history.push('/test')

        } catch (error) {
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
                this.rootStore.commonStore.setToken(newToken.accessToken)
                this.rootStore.commonStore.setRefreshToken(newToken.refreshToken)
            })
            history.push('/dashboard');
        } catch (error) {
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