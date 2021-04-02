/* eslint-disable import/no-cycle */
import { runInAction, makeAutoObservable, computed } from 'mobx';
import {
  IAppUserSerial,
  IRefreshToken,
  IRegisterAdminUser,
  IRegisterNonAdminUser,
  IToken,
  IUser,
  IUserLogin,
} from '../models/user';
import agent from '../api/agent';
import history from '../../history';
import { SUPER_ADMIN, ADMIN, NORMAL, REPORT } from '../models/constants';
import { ISelectGuidInputOptions } from '../models/common';
import { RootStore } from './rootStore';

export default class UserStore {
  rootStore: RootStore;

  token: IToken | null = null;

  user: IUser | null = null;

  loadingInitial = false;

  appUsersRegistry = new Map();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
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
    return !!this.user;
  }

  get hasModifyAccess() {
    return this.getAccessPolicy(SUPER_ADMIN) || this.getAccessPolicy(ADMIN);
  }

  loadAppUsers = async () => {
    this.loadingInitial = true;
    try {
      const users = await agent.Users.list();
      runInAction(() => {
        users.forEach((user) => {
          this.appUsersRegistry.set(user.id, user);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @computed get getAppUsers() {
    return Array.from(this.appUsersRegistry.values()).map((user, i) => {
      const item = user as IAppUserSerial;
      runInAction(() => {
        item.serial = i + 1;
      });
      return item;
    });
  }

  @computed get loadAppUsersOptions() {
    return Array.from(this.appUsersRegistry.values()).map(
      (user) =>
        ({
          key: user.id,
          text: `${user.firstName} ${user.lastName}`,
          value: user.id,
        } as ISelectGuidInputOptions)
    );
  }

  getUser = async () => {
    this.loadingInitial = true;
    try {
      const user = await agent.Users.current();
      runInAction(() => {
        this.user = user;
        this.loadingInitial = false;
      });
      return user;
    } catch (error) {
      runInAction(() => {
        this.user = null;
        this.loadingInitial = false;
      });
      throw error;
    }
  };

  login = async (values: IUserLogin) => {
    const token = await agent.Users.login(values);
    runInAction(async () => {
      this.token = token;
      this.rootStore.commonStore.setToken(token.accessToken);
      this.rootStore.commonStore.setRefreshToken(token.refreshToken);
      this.rootStore.modalStore.closeModal();
    });
    return token;
  };

  registerAdmin = async (user: IRegisterAdminUser) => {
    const result = await agent.Users.registerAdmin(user);
    runInAction(() => {
      if (result.status === 'Success') this.loadAppUsers();
    });
    return result;
  };

  registerNonAdmin = async (user: IRegisterNonAdminUser) => {
    const result = await agent.Users.registerNonAdmin(user);
    runInAction(() => {
      if (result.status === 'Success') this.loadAppUsers();
    });
    return result;
  };

  getRefreshToken = async (token: string) => {
    const refreshToken: IRefreshToken = { refreshToken: token };
    const newToken = await agent.Users.refresh(refreshToken);
    runInAction(async () => {
      this.token = newToken;
      this.rootStore.commonStore.setToken(newToken.accessToken);
      this.rootStore.commonStore.setRefreshToken(newToken.refreshToken);
    });
  };

  moveToDashboardPage = () => {
    history.push('/dashboard');
  };

  logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setRefreshToken(null);
    this.user = null;
    history.push('/');
  };
}
