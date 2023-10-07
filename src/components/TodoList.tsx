import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "../App"
import { error } from "console"


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
    changeStatus: (taskId: string, isdone: boolean) => void
    filter: FilterValuesType
}

export const TodoList = (props: PropsType) => {

    const [input, setInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if (e.key === 'Enter'){
            props.addTask(input)
                setInput('')
        }} 

    const addTask = () => {
        if(input.trim() !== ''){
        props.addTask(input)
            setInput('')
        } else {setError('Field is required')}
    }  
    
    
    const allClickHandler = ()=>{props.changeFilter('All')}
    const activeClickHandler = ()=>{props.changeFilter('active')}
    const completedClickHandler = ()=>{props.changeFilter('completed')}

    let tasksList: Array<JSX.Element> | JSX.Element = props.tasks.length > 0 ?
    props.tasks.map((t)=>{
        const onRemoveTask = ()=>{props.removeTask(t.id)}
        const onChengeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }
        return <li key={t.id} className={t.isdone ? 'is-done' : ''}>
                    <input type="checkbox" checked={t.isdone} onChange={onChengeHandler}/> 
                    <span>{t.title}</span>
                    <button onClick={onRemoveTask}>X</button>
                </li>
    }) : <span>no tasks</span>

    return (
        <div className="todolist">
                <h3>{props.title}</h3>
                <div>
                    <input value={input} 
                            onChange={onChangeHandler}
                            onKeyDown={onKeyPressHandler}
                            className={error ? "error" : ''}
                            />
                    <button onClick={addTask}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={allClickHandler} className={props.filter === 'All' ? "active-filter" : ''}>All</button>
                    <button onClick={activeClickHandler} className={props.filter === 'active' ? "active-filter" : ''}>Active</button>
                    <button onClick={completedClickHandler} className={props.filter === 'completed' ? "active-filter" : ''}>Completed</button>
                </div>
            </div>
    )
}