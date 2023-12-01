import {RootReducerType, store} from "../state/Store";
import React from 'react'
import { Provider } from 'react-redux';
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {TasksReducer} from "../state/TasksReducer";
import {ReducerTodoLists} from "../state/ReduserTodoLists";
import {TaskPriorities, TaskStatuses} from "../../api/TodoLists-api";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0,
            addedDate: '',},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0,
            addedDate: '',}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '1',
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses
                    .New, todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: '2', title: "Milk", status: TaskStatuses
                    .New, todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
            {id: '2', title: "React Book", status: TaskStatuses
                    .Completed, todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootReducerType);




export const Decorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}