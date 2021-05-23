export interface ISignIn {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  roles: string[]
}