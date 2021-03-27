/* eslint-disable no-nested-ternary */
import { runInAction, makeAutoObservable, computed } from 'mobx';
import { IAppUser, IRefreshToken, IRegisterAdminUser, IRegisterNonAdminUser, IToken, IUser, IUserLogin } from '../models/user';
import agent from '../api/agent';
import history from '../../history'
import { SUPER_ADMIN, ADMIN, NORMAL, REPORT } from '../models/constants'
import { ISelectGuidInputOptions } from '../models/common';
import { RootStore } from './rootStore';

export default class UserStore {
    rootStore: RootStore;

    token: IToken | null = null;

    user: IUser | null = null

    loadingInitial = false;

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
        this.loadingInitial = true
        try {
            const users = await agent.Users.list();
            runInAction(() => {
                users.forEach(user => {
                    this.appUsersRegistry.set(user.id, user)
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    getSortedAppUsers() {
        const users: IAppUser[] = Array.from(this.appUsersRegistry.values());
        return users.sort(
            (a, b) => (a.firstName.toLowerCase() === b.firstName.toLowerCase() ?
                0 : (a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1))
                || (a.lastName.toLowerCase() === b.lastName.toLowerCase() ?
                    0 : (a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1))
        );
    }

    @computed get getAppUsers() {
        const sortedAppUsers = this.getSortedAppUsers();

        return Object.entries(sortedAppUsers.reduce((users, user, i) => {
            const key = i + 1;
            users[key] = user;
            return users;
        }, {} as { [key: number]: IAppUser }));
    }

    @computed get loadAppUsersOptions() {
        const sortedAppUsers = this.getSortedAppUsers();
        return sortedAppUsers.map(user => ({
            key: user.id,
            text: `${user.firstName} ${user.lastName}`,
            value: user.id
        } as ISelectGuidInputOptions))
    }

    getUser = async () => {
        this.loadingInitial = true
        try {
            const user = await agent.Users.current();
            runInAction(() => {
                this.user = user;
                this.loadingInitial = false;
            })
            return user;
        } catch (error) {
            runInAction(() => {
                this.user = null;
                this.loadingInitial = false;
            })
        }
    }

    login = async (values: IUserLogin) => {
        const token = await agent.Users.login(values);
        runInAction(async () => {
            this.token = token;
            this.rootStore.commonStore.setToken(token.accessToken)
            this.rootStore.commonStore.setRefreshToken(token.refreshToken)
            this.rootStore.modalStore.closeModal();
        });
        return token;
    }

    registerAdmin = async (user: IRegisterAdminUser) => agent.Users.registerAdmin(user)

    registerNonAdmin = async (user: IRegisterNonAdminUser) => agent.Users.registerNonAdmin(user)

    getRefreshToken = async (token: string) => {
        const refreshToken: IRefreshToken = { 'refreshToken': token };
        const newToken = await agent.Users.refresh(refreshToken);
        runInAction(async () => {
            this.token = newToken;
            this.rootStore.commonStore.setToken(newToken.accessToken)
            this.rootStore.commonStore.setRefreshToken(newToken.refreshToken)
        })
    }

    moveToDashboardPage = () => {
        history.push('/dashboard');
    }

    logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.rootStore.commonStore.setRefreshToken(null);
        this.user = null
        history.push('/')
    }
}