import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionsType, TasksReducer} from "./TasksReducer";
import {ReducerTodoLists, TodoListActionsType} from "./ReduserTodoLists";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppActions, AppReducer} from "./AppReducer";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer
})

export type RootReducerType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootReducerType, unknown, RootActionsType>
export type RootActionsType = TodoListActionsType | TasksActionsType | AppActions
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

