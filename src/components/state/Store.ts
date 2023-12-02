import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksReducer} from "./TasksReducer";
import {ReducerTodoLists} from "./ReduserTodoLists";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists
})

export type RootReducerType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

