import { AuthApi, Params, ResponseType } from "../../api/Api";
import { handleAppError, handleNetworkError } from "../utils/ErrorUtils";
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppActions } from "../../App/AppReducer";
import { clearTodosTasks } from "../../common/Actions";

export type AuthState = ReturnType<typeof slice.getInitialState>;

export const LogIn = createAsyncThunk(
  "auth/LogIn",
  async (params: Params, thunkAPI) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await AuthApi.authMe(params);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
        return;
      } else {
        handleAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({
          errors: res.data.messages,
          fieldErrors: res.data.fieldErrors,
        });
      }
    } catch (err) {
      if (axios.isAxiosError<ResponseType>(err)) {
        const error = err.response?.data
          ? err.response?.data.messages[0]
          : err.message;
        handleNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({});
      } else {
        handleNetworkError((err as Error).message, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({});
      }
    }
  },
);

export const logoutTC = createAsyncThunk("", async (arg, thunkAPI) => {
  thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
  try {
    let res = await AuthApi.logout();
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(clearTodosTasks({ tasks: {}, todoLists: [] }));
      thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
      // thunkAPI.dispatch(AuthAction.setAuthAC({ isAuth: false }));
      return;
    } else {
      handleAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({});
    }
  } catch (err) {
    if (axios.isAxiosError<ResponseType>(err)) {
      const error = err.response?.data
        ? err.response?.data.messages[0]
        : err.message;
      handleNetworkError(error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({});
    } else {
      handleNetworkError((err as Error).message, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({});
    }
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
    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isAuth = false;
    });
  },
});

export const AuthReducer = slice.reducer;
export const AuthAction = slice.actions;

// export const AuthTC = (params: Params) => async (dispatch: Dispatch) => {
//   dispatch(AppActions.setAppStatusAC({ status: "loading" }));
//   try {
//     let res = await AuthApi.authMe(params);
//     if (res.data.resultCode === 0) {
//       dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
//       dispatch(AuthAction.setAuthAC({ isAuth: true }));
//     } else {
//       handleAppError(res.data, dispatch);
//       return res.data;
//     }
//   } catch (err) {
//     if (axios.isAxiosError<ResponseType>(err)) {
//       const error = err.response?.data
//         ? err.response?.data.messages[0]
//         : err.message;
//       handleNetworkError(error, dispatch);
//     } else {
//       handleNetworkError((err as Error).message, dispatch);
//     }
//   }
// };

// export const logoutTC = () => async (dispatch: Dispatch) => {
//   dispatch(AppActions.setAppStatusAC({ status: "loading" }));
//   try {
//     let res = await AuthApi.logout();
//     if (res.data.resultCode === 0) {
//       dispatch(clearTodosTasks({ tasks: {}, todoLists: [] }));
//       dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
//       dispatch(AuthAction.setAuthAC({ isAuth: false }));
//     } else {
//       handleAppError(res.data, dispatch);
//     }
//   } catch (err) {
//     if (axios.isAxiosError<ResponseType>(err)) {
//       const error = err.response?.data
//         ? err.response?.data.messages[0]
//         : err.message;
//       handleNetworkError(error, dispatch);
//     } else {
//       handleNetworkError((err as Error).message, dispatch);
//     }
//   }
// };

// type initStateType = typeof initState
// export type AuthActionType = ReturnType<typeof setAuthAC>

//     (state: initStateType = initState, action: AuthActionType): initStateType => {
//     switch (action.type) {
//         case 'AUTH/AUTH_ME':
//             return {...state, isAuth: action.isAuth}
//         default:
//             return state
//     }
// }

// export const setAuthAC = (isAuth: boolean) => ({
//     type: 'AUTH/AUTH_ME' as const,
//     isAuth
// })
