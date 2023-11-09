import React from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { TodoListForm } from './components/TodoListForm';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC
} from "./components/state/ReduserTodoLists";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC} from "./components/state/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./components/state/Store";



export type FilterValuesType = 'All' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<RootReducerType, Array<TodoListType>>(state => state.todoLists)

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(removeTodolistAC(todolistId))
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTodoTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }

    return (
        <div className="App">
            <TodoListForm addText={addTodoList}/>
            {todoLists.map((tl)=>{
                let tasksForList = tasks[tl.id]
                if(tl.filter === 'completed') {
                    tasksForList = tasksForList.filter(t => t.isDone)
                }
                if(tl.filter === 'active') {
                    tasksForList = tasksForList.filter(t => !t.isDone)
                }
                return (
                    <TodoList key={tl.id}
                                id={tl.id}
                                title={tl.title} 
                                removeTodoList={removeTodoList}
                                changeFilter={changeFilter}
                                filter={tl.filter}
                                changeTodoTitle={changeTodoTitle}
                    />
                ) 
            })}                               
        </div>
    );
}



export default AppWithRedux;
