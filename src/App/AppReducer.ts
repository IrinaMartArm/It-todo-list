import { AuthApi, ResponseType } from "api/Api";
import axios from "axios";
import {
  handleAppError,
  handleNetworkError,
} from "components/utils/handleAppError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAction } from "components/Login/AuthReducer";

export const initialization = createAsyncThunk(
  "app/initialization",
  async (arg, { dispatch }) => {
    try {
      const res = await AuthApi.me();
      if (res.data.resultCode === 0) {
        dispatch(AuthAction.setAuthAC({ isAuth: true }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError<ResponseType>(err)) {
        const error = err.response?.data
          ? err.response?.data.messages[0]
          : err.message;
        handleNetworkError(error, dispatch);
      } else {
        handleNetworkError((err as Error).message, dispatch);
      }
    }
    // finally {
    //   dispatch(AppActions.setInitialized({ isInitialized: true }));
    // }
  },
);

const slice = createSlice({
  name: "app",
  initialState: {
    error: null,
    status: "loading",
    isInitialized: false,
  } as InitState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
      state.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialization.fulfilled, (state, action) => {
      state.isInitialized = true;
    });
  },
});

export const AppReducer = slice.reducer;
export const AppActions = slice.actions;

// export const initialization_ = () => async (dispatch: Dispatch) => {
//   try {
//     const res = await AuthApi.me();
//     if (res.data.resultCode === 0) {
//       dispatch(AuthAction.setAuthAC({ isAuth: true }));
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
//   } finally {
//     dispatch(AppActions.setInitialized({ isInitialized: true }));
//   }
// };

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type InitState = {
  error: string | null;
  status: RequestStatus;
  isInitialized: boolean;
};

// export type AppActions = ReturnType<typeof setAppErrorAC> |
//                     ReturnType<typeof setAppStatusAC> | ReturnType<typeof setInitialized>

// export const AppReducer = (state: InitState = initState, action: AppActions) => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-IS-INITIALIZED':
//             return {...state, isInitialized: action.value}
//         default:
//             return state
//     }
// }
// export const setAppErrorAC = (error: string | null) => ({
//     type: 'APP/SET-ERROR',
//     error
// } as const)
// export const setAppStatusAC = (status: RequestStatus) => ({
//     type: 'APP/SET-STATUS',
//     status
// } as const)
// export const setInitialized = (value: boolean) => ({
//     type: 'APP/SET-IS-INITIALIZED',
//     value
// } as const)
