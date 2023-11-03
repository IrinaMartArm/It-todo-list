import React, {useReducer} from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, TaskReducer} from "./state/dop/TaskReducer";
import {changeFilterAC, FilterReducer} from "./state/dop/FilterReducer";



export type FilterValuesType = 'All' | 'completed' | 'active';


function App3() {

    const [tasks, dispatchTasks] = useReducer(TaskReducer,
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ])

    const removeTask = (id: string) => {
        dispatchTasks(removeTaskAC(id))
    }

    const addTask = (title: string) => {
        dispatchTasks(addTaskAC(title))
    }

    const [filter, dispatchFilter] = useReducer(FilterReducer,'All')

    let tasksForList: TaskType[] = tasks
    if(filter === 'completed') {
        tasksForList = tasksForList.filter(t => t.isDone)
    }
    if(filter === 'active') {
        tasksForList = tasksForList.filter(t => !t.isDone)
    }

    const changeFilter = (value: FilterValuesType) => {
        dispatchFilter(changeFilterAC(value))
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        dispatchTasks(changeStatusAC(taskId, isDone))
    }

    const changeTaskTitle = (taskId: string, title: string) => {
        dispatchTasks(changeTitleAC(taskId, title))
    }

    return (
        <div className="App">
            {/*{todoList.map((tl)=>{*/}

            {/*    return (*/}
            {/*        <TodoList key={tl.id}*/}
            {/*                  id={tl.id}*/}
            {/*                  tasks={tasksForList}*/}
            {/*                  title={tl.title}*/}
            {/*                  removeTask={removeTask}*/}
            {/*                  changeFilter={changeFilter}*/}
            {/*                  changeStatus={changeStatus}*/}
            {/*                  addTask={addTask}*/}
            {/*                  filter={tl.filter}*/}
            {/*                  changeTaskTitle={changeTaskTitle}*/}
            {/*                 */}
            {/*        />*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
}

export default  App3;
