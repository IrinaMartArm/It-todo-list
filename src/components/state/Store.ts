import {AnyAction, combineReducers} from "redux";
import {TasksReducer} from "./TasksReducer";
import {ReducerTodoLists} from "./ReduserTodoLists";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import { AppReducer} from "./AppReducer";
import { AuthReducer} from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer,
    auth: AuthReducer
})

export type RootReducerType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootReducerType, unknown, AnyAction>

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

// Оставлю для помощи
// export type AppStateType = ReturnType<typeof store.getState>
// export type AppDispatch=typeof store.dispatch
// export const useAppDispatch:()=>AppDispatch=useDispatch
// export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>
// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector