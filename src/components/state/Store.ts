import {combineReducers, legacy_createStore} from "redux";
import {TasksReducer} from "./TasksReducer";
import {ReducerTodoLists} from "./ReduserTodoLists";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists
})

export type RootReducerType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store

