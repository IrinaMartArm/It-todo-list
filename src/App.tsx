import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';

export type FilterValuesType = 'All' | 'completed' | 'active';

function App() {

    let InitialTasks: Array<TaskType> = [
        {id: 1, title: 'HTML', isdone: true},
        {id: 2, title: 'JS', isdone: true},
        {id: 3, title: 'React', isdone: false},
    ]

    const [tasks, setTasks] = useState(InitialTasks)
    let [filter, setFilter] = useState<FilterValuesType>('All')

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t=> t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
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
                        changeFilter={changeFilter}/>
                        
        </div>
    );
}



export default App;
