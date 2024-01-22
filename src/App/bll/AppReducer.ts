import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";

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
      debugger;
      state.isInitialized = action.payload.isInitialized;
    },
  },
  selectors: {
    getIsInitialized: (sliceState) => sliceState.isInitialized,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed";
        // if (action.payload) {
        //   state.error = action.payload.message[0];
        // } else {
        state.error = action.error.message;
        //     ? action.error.message
        //     : "Some error occurred";
        // }
      });
  },
});

export const AppReducer = slice.reducer;
export const AppActions = slice.actions;
export const { getIsInitialized } = slice.selectors;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type InitState = {
  error: string | null;
  status: RequestStatus;
  isInitialized: boolean;
};
