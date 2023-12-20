import {RootReducerType} from "../state/Store";
import React from 'react'
import { Provider } from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksReducer} from "../state/TasksReducer";
import {ReducerTodoLists} from "../state/ReduserTodoLists";
import {TaskPriorities, TaskStatuses} from "../../api/TodoLists-api";
import {AppReducer} from "../state/AppReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer
})

const initialGlobalState: RootReducerType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0,
            addedDate: '', entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0,
            addedDate: '',  entityStatus: 'loading'}
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
    },
    app: {
        error: null,
        status: 'idle'
    },
    auth: {
        isAuth: false
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootReducerType, applyMiddleware(thunk));




export const Decorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}