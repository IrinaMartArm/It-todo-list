import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'All' | 'completed' | 'active';

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const tdlId1 = v1()
    const tdlId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: tdlId1, title: 'What to learn', filter: 'All'},
        {id: tdlId2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, setTasks] = useState({
        [tdlId1]: [
            {id: v1(), title: 'HTML', isdone: true},
            {id: v1(), title: 'JS', isdone: true},
            {id: v1(), title: 'React', isdone: false},
        ],
        [tdlId2]: [
            {id: v1(), title: 'Koffee', isdone: true},
            {id: v1(), title: 'Bread', isdone: true},
            {id: v1(), title: 'Meat', isdone: false},
        ],
    })

    const removeTask = (id: string, todolistId: string) => {
        let task = tasks[todolistId]
        let filteredTasks = task.filter(t=> t.id !== id)
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isdone: false
        }
        let task = tasks[todolistId] 
        let newTasks = [newTask, ...task]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todoList = todoLists.find(tl => tl.id === todolistId)
    if(todoList) {
        todoList.filter = value
        setTodoLists([...todoLists])
    }
    }

    const changeStatus = (taskId: string, isdone: boolean, todolistId: string) => {
        let task = tasks[todolistId] 
        const taska = task.find(t => t.id === taskId)
        if(taska){taska.isdone = isdone}
        setTasks({...tasks})
    }

    const removeTodoList = (todolistId: string) => {
        let newTodoList =  todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(newTodoList)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map((tl)=>{
                let tasksForList = tasks[tl.id]
                if(tl.filter === 'completed') {
                    tasksForList = tasksForList.filter(t => t.isdone === true)
                }
                if(tl.filter === 'active') {
                    tasksForList = tasksForList.filter(t => t.isdone === false)
                }
                return <TodoList key={tl.id}
                                id={tl.id}
                                tasks={tasksForList} 
                                title={tl.title} 
                                removeTodoList={removeTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                changeStatus={changeStatus}
                                addTask={addTask}
                                filter={tl.filter}
                        />   
            })}                               
        </div>
    );
}



export default App;
