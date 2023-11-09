import React, {useReducer} from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';
import { TodoListForm } from './components/TodoListForm';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    ReducerTodoLists,
    removeTodolistAC
} from "./components/state/ReduserTodoLists";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, TasksReducer} from "./components/state/TasksReducer";



export type FilterValuesType = 'All' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const tdlId1 = v1()
const tdlId2 = v1()

function AppWithReducer() {



    const [todoLists, dispatchToTodoListsReducer] = useReducer(ReducerTodoLists,[
        {id: tdlId1, title: 'What to learn', filter: 'All'},
        {id: tdlId2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(TasksReducer, {
        [tdlId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [tdlId2]: [
            {id: v1(), title: 'Coffee', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ],
    })

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistId, id))
    }

    const addTask = (todolistId: string, title: string) => {
       const action = addTaskAC(todolistId, title)
        dispatchToTasksReducer(action)
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchToTodoListsReducer(changeTodolistFilterAC(todolistId, value))
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeStatusAC(todolistId, taskId, isDone)
        dispatchToTasksReducer(action)
    }

    const removeTodoList = (todolistId: string) => {
        dispatchToTodoListsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    const addTodoList = (title: string) => {

        const action = addTodolistAC(title)

        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action = changeTitleAC(todolistId, taskId, title)
        dispatchToTasksReducer(action)
    }

    const changeTodoTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatchToTodoListsReducer(action)
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
                                tasks={tasksForList} 
                                title={tl.title} 
                                removeTodoList={removeTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                changeStatus={changeStatus}
                                addTask={addTask}
                                filter={tl.filter}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoTitle={changeTodoTitle}
                        />  
                ) 
            })}                               
        </div>
    );
}



export default AppWithReducer;
