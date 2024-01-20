import { AuthReducer, AuthThunks } from "./AuthReducer";

let startState: { isAuth: boolean };
beforeEach(() => {
  startState = {
    isAuth: true,
  };
});

// test("correct status should be set", () => {
//   const endState = AuthReducer(
//     startState,
//     AuthThunks.logout(),
//   );
//
//   expect(endState.isAuth).toBe(false);
// });
