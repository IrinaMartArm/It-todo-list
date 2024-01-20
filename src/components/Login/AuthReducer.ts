import { createSlice } from "@reduxjs/toolkit";
import { AppActions } from "App/AppReducer";
import { clearTodosTasks } from "common/Actions";
import {
  createAppAsyncThunk,
  handleAppError,
  handleServerNetworkError,
} from "common/utils";
import { Params } from "common/api";
import { AuthApi } from "common/api/AuthApi";

// export type AuthState = ReturnType<typeof slice.getInitialState>;

export const initializeApp = createAppAsyncThunk(
  "app/initialization",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await AuthApi.me();
      if (res.data.resultCode === 0) {
        return { isAuth: true };
      } else {
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(AppActions.setAppIsInitialized({ isInitialized: true }));
    }
  },
);

const LogIn = createAppAsyncThunk<{ isAuth: boolean }, Params>(
  "auth/LogIn",
  async (params: Params, thunkAPI) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await AuthApi.authMe(params);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
        return { isAuth: true };
      } else {
        const isShowAppError = !res.data.fieldErrors?.length;
        handleAppError(res.data, thunkAPI.dispatch, isShowAppError);
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

const logout = createAppAsyncThunk<{ isAuth: boolean }, undefined>(
  "",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      let res = await AuthApi.logout();
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(clearTodosTasks({ tasks: {}, todoLists: [] }));
        thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
        return { isAuth: false };
      } else {
        handleAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState: { isAuth: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LogIn.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
  },
});

export const AuthReducer = slice.reducer;
export const AuthThunks = { LogIn, logout, initializeApp };
