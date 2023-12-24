import {RootReducerType} from "./Store";
import React from 'react'
import { Provider } from 'react-redux';
import {combineReducers} from "redux";
import {TasksReducer} from "../components/TodoList/TasksReducer";
import {ReducerTodoLists} from "../components/TodoList/ReduserTodoLists";
import {TaskPriorities, TaskStatuses} from "../api/Api";
import {AppReducer} from "./AppReducer";
import thunk from "redux-thunk";
import {AuthReducer} from "../components/Login/AuthReducer";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import {BrowserRouter, MemoryRouter, Routes} from "react-router-dom";
import {Story} from "@storybook/react";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists,
    app: AppReducer,
    auth: AuthReducer
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
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isAuth: false
    }
};


export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        // .prepend(thunk),
})
    // legacy_createStore(rootReducer, initialGlobalState as RootReducerType, applyMiddleware(thunk));


export const Decorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const DecoratorRouter = (StoryComponent: Story) => {
    return <MemoryRouter initialEntries={['/']}>
            <StoryComponent/>
    </MemoryRouter>
}