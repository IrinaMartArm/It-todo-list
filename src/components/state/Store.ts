import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionsType, TasksReducer} from "./TasksReducer";
import {ReducerTodoLists, TodoListActionsType} from "./ReduserTodoLists";
import thunk, {ThunkDispatch} from "redux-thunk";
import {AppActions, AppReducer} from "./AppReducer";
import {AuthActionType, AuthReducer} from "./AuthReducer";



const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer,
    auth: AuthReducer
})

export type RootReducerType = ReturnType<typeof store.getState>
export type RootActionsType = TodoListActionsType | TasksActionsType | AppActions | AuthActionType
export type AppDispatch = ThunkDispatch<RootReducerType, unknown, RootActionsType>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector