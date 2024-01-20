import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null,
    status: "idle",
    isInitialized: false,
  } as InitState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) {
      state.status = action.payload.status;
    },
    setAppIsInitialized: (state, action) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const AppReducer = slice.reducer;
export const AppActions = slice.actions;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type InitState = {
  error: string | null;
  status: RequestStatus;
  isInitialized: boolean;
};
