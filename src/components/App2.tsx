import React, { useEffect, useState } from 'react';
import './../App.css';
import { TaskType, TodoList } from './/TodoList';
import { v1 } from 'uuid';
import { Button } from './Button';
import { TodoListForm } from './/TodoListForm';



export type FilterValuesType = 'All' | 'completed' | 'active';

type TodoListType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
}

type FinalTodoListType = TodoListType &{
    todolistId: string
}

function App2() {

    let fromServerTodoList: TodoListType[] = [
        {
            title: 'What to learn', 
            filter: 'All',
            tasks: [
                {id: v1(), title: 'HTML', isdone: true},
                {id: v1(), title: 'JS', isdone: true},
                {id: v1(), title: 'React', isdone: false},
            ]},
            { 
            title: 'What to buy', 
            filter: 'All',
            tasks: [
                {id: v1(), title: 'Koffee', isdone: true},
                {id: v1(), title: 'Bread', isdone: true},
                {id: v1(), title: 'Meat', isdone: false},
            ]}
    ]

    const [todoLists, setTodoLists] = useState< FinalTodoListType[]>([])

    useEffect(() => {
        setTodoLists(fromServerTodoList.map((el) => ({...el, todolistId: v1()})))
    }, [])


    const removeTask = (todolistId: string, id: string) => {
        setTodoLists(todoLists.map(tl => tl.todolistId === todolistId ? {...tl, tasks: tl.tasks.filter(t => t.id !== id)} : tl))
    }

    const addTask = (todolistId: string, title: string) => {

        let newTask = {
            id: v1(),
            title: title,
            isdone: false
        }
        setTodoLists(todoLists.map(tl => tl.todolistId === todolistId ? {...tl, tasks: [newTask, ...tl.tasks]} : tl))
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.todolistId === todolistId ? {...tl, filter: value} : tl))
    }

    const changeStatus = (todolistId: string, taskId: string, isdone: boolean) => {
        setTodoLists(todoLists.map(tl => tl.todolistId === todolistId ? {...tl, tasks: tl.tasks.map(t => t.id === taskId ? {...t, isdone: isdone }  : t)} : tl))
    }

    const removeTodoList = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.todolistId !== todolistId))
    }

    const addTodoList = (title: string) => {
        let newTodoList: FinalTodoListType = {
            todolistId: v1(), title: title, filter: 'All', tasks: []
        }
        setTodoLists([newTodoList, ...todoLists])
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.todolistId === todolistId ? {...tl, tasks: tl.tasks.map(t => t.id === taskId ? {...t, title: title} : t)}  : tl))
    }

    const changeTodoTitle = (todolistId: string , title: string) => {
        setTodoLists(todoLists.map(tl => tl.todolistId === todolistId ? {...tl, title: title}  : tl))
    }

    return (
        <div className="App">
            <TodoListForm addText={addTodoList}/>
            {todoLists.map((tl)=>{
                let tasksForList = tl.tasks
                if(tl.filter === 'completed') {
                    tasksForList = tasksForList.filter(t => t.isdone === true)
                }
                if(tl.filter === 'active') {
                    tasksForList = tasksForList.filter(t => t.isdone === false)
                }
                return (
                    <TodoList key={tl.todolistId}
                                id={tl.todolistId}
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



export default App2;
