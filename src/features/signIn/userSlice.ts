import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISignIn } from "../../model/SignIn.model";
import { AppThunk, RootState } from "../../store";

interface UserState {
    isLoggedIn: boolean;
    appLoaded: boolean
}

const initialState: UserState = {
    isLoggedIn: false,
    appLoaded: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAppLoaded: (state, action: PayloadAction<boolean>) => {
            state.appLoaded = action.payload
        },
        isLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        signOut: state => {
            state.isLoggedIn = false;
        }
    }
});

export const { signOut, isLoggedIn, setAppLoaded } = userSlice.actions;

export const signInAsync = (user: ISignIn): AppThunk => async dispatch => {
    try {
        console.log({...user})
        if(user.email === "test@test.com" && user.password === "test")
            dispatch(isLoggedIn(true));
        else
            dispatch(isLoggedIn(false));
    } catch (error) {
        dispatch(isLoggedIn(false));
        console.log(error);
        throw error;
    }
    finally {
        dispatch(setAppLoaded(true));
    }
}

export const getUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getAppLoaded = (state: RootState) => state.user.appLoaded;
export default userSlice.reducer;
