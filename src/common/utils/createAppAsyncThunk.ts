import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootReducerType } from "App/Store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootReducerType;
  dispatch: AppDispatch;
  rejectValue: null;
}>();
