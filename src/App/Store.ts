import { TasksReducer } from "components/TodoList/bll/TasksReducer";
import { ReducerTodoLists } from "components/TodoList/bll/TodoListsReduser";
import { AppReducer } from "App/bll/AppReducer";
import { AuthReducer } from "components/Login/AuthReducer";
import { configureStore } from "@reduxjs/toolkit";

export type RootReducerType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer,
    auth: AuthReducer,
  },
});

// @ts-ignore
window.store = store;

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector

// Оставлю для помощи
// export type AppStateType = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>
// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
