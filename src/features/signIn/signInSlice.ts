import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import agent from '../../api/agent'
import { ISignIn, IToken } from '../../model/User.model';
import type { AppThunk, RootState } from '../../store';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';

interface ISignInState {
  token: IToken | null;
  accessJWT: string | null;
  refreshJWT: string | null;
  isLoggedIn: boolean;
  appLoaded: boolean;
}

const initialState: ISignInState = {
  token: null,
  accessJWT: window.localStorage.getItem(ACCESS_TOKEN),
  refreshJWT: window.localStorage.getItem(REFRESH_TOKEN),
  isLoggedIn: false,
  appLoaded: false,
};

export const signInSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload;
      state.accessJWT = action.payload.accessToken;
      window.localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken)
      state.refreshJWT = action.payload.refreshToken;
      window.localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken)
      state.isLoggedIn = true;
    },
    setAppLoaded: (state, action: PayloadAction<boolean>) => {
      state.appLoaded = action.payload;
    },
    setSignOut: (state) => {
      state.token = null;
      state.accessJWT = null;
      window.localStorage.removeItem(REFRESH_TOKEN)
      state.refreshJWT = null;
      window.localStorage.removeItem(ACCESS_TOKEN)
      state.isLoggedIn = false;
    },
  },
});

export const {
  setToken,
  setSignOut,
  setAppLoaded } = signInSlice.actions;

export const signInAsync = (signIn: ISignIn): AppThunk => async (dispatch) => {
  try {
    const result = await agent.User.login(signIn);
    dispatch(setToken(result));
  } catch (error) {
    dispatch(setSignOut());
    throw error;
  } finally {
    dispatch(setAppLoaded(true));
  }
};

export const getToken = (state: RootState) => state.user.token;
export const getAccessJWT = (state: RootState) => state.user.accessJWT;
export const getRefreshJWT = (state: RootState) => state.user.refreshJWT;
export const getIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getAppLoaded = (state: RootState) => state.user.appLoaded;

export default signInSlice.reducer;
