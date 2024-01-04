import { AuthAction, AuthReducer } from "./AuthReducer";

let startState: { isAuth: boolean };
beforeEach(() => {
  startState = {
    isAuth: false,
  };
});

test("correct status should be set", () => {
  const endState = AuthReducer(
    startState,
    AuthAction.setAuthAC({ isAuth: true }),
  );

  expect(endState.isAuth).toBe(true);
});
