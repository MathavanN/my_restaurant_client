export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface IRegisterResult {
  status: string;
  message: string;
}
export interface IRegisterAdminUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterNonAdminUser extends Partial<IRegisterAdminUser> {
  roles: string[];
}

export interface IAppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
export interface IRefreshToken {
  refreshToken: string;
}
