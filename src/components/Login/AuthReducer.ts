import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { clearTodosTasks } from "common/Actions";
import { createAppAsyncThunk } from "common/utils";
import { Params } from "common/api";
import { AuthApi } from "common/api/AuthApi";
import { AppActions } from "App/bll/AppReducer";

export const initializeApp = createAppAsyncThunk<
  { isAuth: boolean },
  undefined
>("app/initialization", async (_, { dispatch, rejectWithValue }) => {
  const res = await AuthApi.me();
  debugger;
  dispatch(AppActions.setAppIsInitialized({ isInitialized: true }));
  if (res.data.resultCode === 0) {
    return { isAuth: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const LogIn = createAppAsyncThunk<{ isAuth: boolean }, Params>(
  "auth/LogIn",
  async (params: Params, thunkAPI) => {
    const res = await AuthApi.authMe(params);
    if (res.data.resultCode === 0) {
      return { isAuth: true };
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  },
);

const logout = createAppAsyncThunk<{ isAuth: boolean }, undefined>(
  "",
  async (_, thunkAPI) => {
    let res = await AuthApi.logout();
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(clearTodosTasks({ tasks: {}, todoLists: [] }));
      return { isAuth: false };
    } else {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState: { isAuth: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(
        AuthThunks.LogIn,
        AuthThunks.logout,
        AuthThunks.initializeApp,
      ),
      (state, action: PayloadAction<{ isAuth: boolean }>) => {
        state.isAuth = action.payload.isAuth;
      },
    );
  },
  selectors: {
    getIsAuth: (sliceState) => sliceState.isAuth,
  },
});

export const AuthReducer = slice.reducer;
export const AuthThunks = { LogIn, logout, initializeApp };
export const { getIsAuth } = slice.selectors;
