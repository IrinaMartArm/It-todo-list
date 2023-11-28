import {RootReducerType, store} from "../state/Store";
import React from 'react'
import { Provider } from 'react-redux';
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {TasksReducer} from "../state/TasksReducer";
import {ReducerTodoLists} from "../state/ReduserTodoLists";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootReducerType);




export const Decorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}