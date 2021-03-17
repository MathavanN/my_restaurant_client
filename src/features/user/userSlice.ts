import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "api/agent";
import { AppThunk, RootState } from "app/store";
import { IToken, IUser, IUserLogin } from "model/User.model"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "utils/constants";

interface UserState {
    token: IToken | null;
    accessJWT: string | null;
    refreshJWT: string | null;
    user: IUser | null;
    isLoggedIn: boolean;
    appLoaded: boolean
}
const initialState: UserState = {
    token: null,
    accessJWT: window.localStorage.getItem(ACCESS_TOKEN),
    refreshJWT: window.localStorage.getItem(REFRESH_TOKEN),
    user: null,
    isLoggedIn: false,
    appLoaded: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchToken: (state, action: PayloadAction<IToken>) => {
            state.token = action.payload
        },
        fetchUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload
        },
        setAccessJWT: (state, action: PayloadAction<string>) => {
            state.accessJWT = action.payload;
            window.localStorage.setItem(ACCESS_TOKEN, action.payload)
        },
        setRefreshJWT: (state, action: PayloadAction<string>) => {
            state.refreshJWT = action.payload;
            window.localStorage.setItem(REFRESH_TOKEN, action.payload)
        },
        setAppLoaded: (state, action: PayloadAction<boolean>) => {
            state.appLoaded = action.payload
        },
        isLoggedIn: state => {
            state.isLoggedIn = !!state.user;
        },
        signOut: state => {
            state.refreshJWT = null;
            window.localStorage.removeItem(ACCESS_TOKEN)
            state.accessJWT = null;
            window.localStorage.removeItem(REFRESH_TOKEN)
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});

export const { fetchToken, setAccessJWT, setRefreshJWT, signOut, fetchUser, isLoggedIn, setAppLoaded } = userSlice.actions

export const userLoginAsync = (user: IUserLogin): AppThunk => async dispatch => {
    try {
        const response = await agent.User.login(user);
        dispatch(fetchToken(response))
        dispatch(setAccessJWT(response.accessToken))
        dispatch(setRefreshJWT(response.refreshToken))

        const currentUser = await agent.User.current();
        dispatch(fetchUser(currentUser))
        dispatch(isLoggedIn())
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        dispatch(fetchUser(null));
        dispatch(setAppLoaded(true));
    }
}

export const currentUserAsync = (): AppThunk => async dispatch => {
    try {
        const response = await agent.User.current();
        dispatch(fetchUser(response))
        dispatch(isLoggedIn())
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        dispatch(fetchUser(null))
        dispatch(setAppLoaded(true))
    }
}

export const getToken = (state: RootState) => state.user.token;
export const getAccessJWT = (state: RootState) => state.user.accessJWT;
export const getRefreshJWT = (state: RootState) => state.user.refreshJWT;
export const getUser = (state: RootState) => state.user.user;
export const getUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getAppLoaded = (state: RootState) => state.user.appLoaded;
export default userSlice.reducer;