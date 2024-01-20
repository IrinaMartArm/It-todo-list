import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { AppActions } from "App/bll/AppReducer";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootReducerType } from "App/Store";

export const thunkTryCatch = async <T,>(
  thunkAPI: BaseThunkAPI<RootReducerType, unknown, AppDispatch, null | T>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(AppActions.setAppStatusAC({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(AppActions.setAppStatusAC({ status: "idle" }));
  }
};
