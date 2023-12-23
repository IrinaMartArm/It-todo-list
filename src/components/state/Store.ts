import {combineReducers} from "redux";
import {TasksActionsType, TasksReducer} from "./TasksReducer";
import {ReducerTodoLists, TodoListActionsType} from "./ReduserTodoLists";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {AppActions, AppReducer} from "./AppReducer";
import { AuthReducer} from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer,
    auth: AuthReducer
})

export type RootReducerType = ReturnType<typeof store.getState>
export type RootActionsType = TodoListActionsType | TasksActionsType | AppActions
export type AppDispatch = ThunkDispatch<RootReducerType, unknown, RootActionsType>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
        .prepend(thunkMiddleware)
})

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector