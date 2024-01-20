import { AppDispatch } from "App/Store";
import { AppActions } from "App/AppReducer";
import { ResponseType } from "common/api";

export const handleAppError = <D>(
  res: ResponseType<D>,
  dispatch: AppDispatch,
  showError: boolean = true,
) => {
  if (showError) {
    if (res.messages.length) {
      dispatch(AppActions.setAppErrorAC({ error: res.messages[0] }));
    } else {
      dispatch(AppActions.setAppErrorAC({ error: "some error" }));
    }
  }
  dispatch(AppActions.setAppStatusAC({ status: "failed" }));
};
