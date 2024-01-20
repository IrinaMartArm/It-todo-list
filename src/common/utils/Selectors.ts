import { RootReducerType } from "App/Store";

export const getTasks = (state: RootReducerType) => state.tasks;

export const getIsAuth = (state: RootReducerType) => state.auth.isAuth;
export const getTodoLists = (state: RootReducerType) => state.todoLists;
export const getIsInitialized = (state: RootReducerType) =>
  state.app.isInitialized;
