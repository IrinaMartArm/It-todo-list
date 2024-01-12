import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppActions } from "App/AppReducer";
import { clearTodosTasks } from "common/Actions";
import {
  createAppAsyncThunk,
  handleAppError,
  handleServerNetworkError,
} from "common/utils";
import { Params } from "common/api";
import { AuthApi } from "common/api/AuthApi";

export type AuthState = ReturnType<typeof slice.getInitialState>;

const LogIn = createAppAsyncThunk<{ isAuth: boolean }, Params>(
  "auth/LogIn",
  async (params: Params, thunkAPI) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await AuthApi.authMe(params);
      if (res.data.resultCode === 0) {
        return { isAuth: true };
      } else {
        handleAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(
          null,
          //   {
          //   errors: res.data.messages,
          //   fieldErrors: res.data.fieldErrors,
          // }
        );
      }
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    } finally {
      thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    }
  },
);

const logout = createAsyncThunk("", async (arg, thunkAPI) => {
  thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
  try {
    let res = await AuthApi.logout();
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(clearTodosTasks({ tasks: {}, todoLists: [] }));
      // thunkAPI.dispatch(AuthAction.setAuthAC({ isAuth: false }));
      return { isAuth: false };
    } else {
      handleAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  } catch (err) {
    handleServerNetworkError(err, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue(null);
  } finally {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
  }
});

const slice = createSlice({
  name: "auth",
  initialState: { isAuth: false },
  reducers: {
    setAuthAC(state, action: PayloadAction<{ isAuth: boolean }>) {
      state.isAuth = action.payload.isAuth;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LogIn.fulfilled, (state, action) => {
      state.isAuth = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
    });
  },
});

export const AuthReducer = slice.reducer;
export const AuthAction = slice.actions;
export const AuthThunks = { LogIn, logout };
