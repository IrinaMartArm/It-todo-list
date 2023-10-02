import { useState } from "react"
import { FilterValuesType } from "../App"

export type TaskType = {
    id: string
    title: string
    isdone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export const TodoList = (props: PropsType) => {

    const [input, setInput] = useState('')

    return (
        <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={input} onChange={(e)=>{setInput(e.currentTarget.value)}}/>
                    <button onClick={()=>{props.addTask(input)
                                            setInput('')
                                    }}>+</button>
                </div>
                <ul>
                    {props.tasks.map((t)=>{
                        return <li key={t.id}>
                                    <input type="checkbox" checked={t.isdone}/> 
                                    <span>{t.title}</span>
                                    <button onClick={()=>{props.removeTask(t.id)}}>X</button>
                                </li>
                    })}
                </ul>
                <div>
                    <button onClick={()=>{props.changeFilter('All')}}>All</button>
                    <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                    <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
                </div>
            </div>
    )
}