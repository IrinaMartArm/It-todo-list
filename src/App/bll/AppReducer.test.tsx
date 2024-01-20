import { AppActions, AppReducer, InitState } from "App/bll/AppReducer";

let startState: InitState;
beforeEach(() => {
  startState = {
    error: "some error",
    status: "idle",
    isInitialized: false,
  };
});
test("correct error should be set", () => {
  const endState = AppReducer(
    startState,
    AppActions.setAppErrorAC({ error: "error" }),
  );

  expect(endState.error).toBe("error");
});
test("correct status should be set", () => {
  const endState = AppReducer(
    startState,
    AppActions.setAppStatusAC({ status: "loading" }),
  );

  expect(endState.status).toBe("loading");
});
