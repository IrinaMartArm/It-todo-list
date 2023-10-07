import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'All' | 'completed' | 'active';

function App() {

    let InitialTasks: Array<TaskType> = [
        {id: v1(), title: 'HTML', isdone: true},
        {id: v1(), title: 'JS', isdone: true},
        {id: v1(), title: 'React', isdone: false},
    ]

    const [tasks, setTasks] = useState(InitialTasks)
    let [filter, setFilter] = useState<FilterValuesType>('All')

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t=> t.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isdone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeStatus = (taskId: string, isdone: boolean) => {
        const task = tasks.find(t => t.id === taskId)
        if(task){task.isdone = isdone}
        setTasks([...tasks])
    }

    let tasksForList = tasks
    if(filter === 'completed') {
        tasksForList = tasks.filter(t => t.isdone === true)
    }
    if(filter === 'active') {
        tasksForList = tasks.filter(t => t.isdone === false)
    }

    return (
        <div className="App">
            <TodoList tasks={tasksForList} 
                        title='What to learn' 
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        addTask={addTask}
                        filter={filter}
                        />                        
        </div>
    );
}



export default App;
