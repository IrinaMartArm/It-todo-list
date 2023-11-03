import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';
import { ButtonS } from './components/Button';
import { TodoListForm } from './components/TodoListForm';



export type FilterValuesType = 'All' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const tdlId1 = v1()
    const tdlId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: tdlId1, title: 'What to learn', filter: 'All'},
        {id: tdlId2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
            isDone: false
        }
        let task = tasks[todolistId] 
        let newTasks = [newTask, ...task]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
    let todoList = todoLists.find(tl => tl.id === todolistId)
    if(todoList) {
        todoList.filter = value
        setTodoLists([...todoLists])
    }
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let task = tasks[todolistId] 
        const taska = task.find(t => t.id === taskId)
        if(taska){taska.isDone = isDone}
        setTasks({...tasks})
    }

    const removeTodoList = (todolistId: string) => {
        let newTodoList =  todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(newTodoList)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        let newTodoList: TodoListType = {
            id: v1(), title: title, filter: 'All'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({ ...tasks, [newTodoList.id]: []})
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        let task = tasks[todolistId] 
        const taska = task.find(t => t.id === taskId)
        if(taska){taska.title = title}
        setTasks({...tasks})
    }

    const changeTodoTitle = (title: string, todolistId: string ) => {

    const testTodos = todoLists.map((todo) => 
        todo.id === todolistId ? {...todo, title: title} : todo)
        setTodoLists(testTodos)

        // let todoList = todoLists.find(tl => tl.id === todolistId)
        // if(todoList){todoList.title = title} 
        // setTodoLists([...todoLists])     
    }

    return (
        <div className="App">
            <TodoListForm addText={addTodoList}/>
            {todoLists.map((tl)=>{
                let tasksForList = tasks[tl.id]
                if(tl.filter === 'completed') {
                    tasksForList = tasksForList.filter(t => t.isDone === true)
                }
                if(tl.filter === 'active') {
                    tasksForList = tasksForList.filter(t => t.isDone === false)
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



export default App;
