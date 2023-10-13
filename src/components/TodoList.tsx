import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "../App"
import { Button } from "./Button"


export type TaskType = {
    id: string
    title: string
    isdone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    removeTodoList: (todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeStatus: (taskId: string, isdone: boolean, todolistId: string) => void
    filter: FilterValuesType
}

export const TodoList = (props: PropsType) => {

    const [input, setInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const removeTodoHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(input, props.id)
                setInput('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if (e.key === 'Enter'){
            addTaskHandler()
        }} 

    const addTask = () => {
        if(input.trim() !== ''){
            addTaskHandler()
        } else {setError('Field is required')}
    }  
    
    const filterhandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }

    let tasksList: Array<JSX.Element> | JSX.Element = props.tasks.length > 0 ?
    props.tasks.map((t)=>{
        const onRemoveTask = ()=>{props.removeTask(t.id, props.id)}
        const onChengeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        return <li key={t.id} className={t.isdone ? 'is-done' : ''}>
                    <input type="checkbox" checked={t.isdone} onChange={onChengeHandler}/> 
                    <span>{t.title}</span>
                    <Button name="X" callback={onRemoveTask}/>
                </li>
    }) : <span>no tasks</span>

    return (
        <div className="todolist">
                <h3>{props.title}<button onClick={removeTodoHandler}>x</button></h3>
                <div>
                    <input value={input} 
                            onChange={onChangeHandler}
                            onKeyDown={onKeyDownHandler}
                            className={error ? "error" : ''}
                            />
                    <Button name="+" callback={addTask}/>       
                    {error && <div className="error-message">{error}</div>}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button callback={()=>filterhandler('All')} name='All' className={props.filter === 'All' ? "active-filter" : ''}/>
                    <Button callback={()=>filterhandler('active')} name='Active' className={props.filter === 'active' ? "active-filter" : ''}/>
                    <Button callback={()=>filterhandler('completed')} name='Completed' className={props.filter === 'completed' ? "active-filter" : ''}/>
                </div>
            </div>
    )
}