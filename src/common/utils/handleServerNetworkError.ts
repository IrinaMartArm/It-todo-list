import { AppDispatch } from "App/Store";
import { AppActions } from "App/bll/AppReducer";
import axios from "axios";

export const handleServerNetworkError = (
  err: unknown,
  dispatch: AppDispatch,
): void => {
  let errorMessage = "Some error occurred";

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(AppActions.setAppErrorAC({ error: errorMessage }));
  dispatch(AppActions.setAppStatusAC({ status: "failed" }));
};
