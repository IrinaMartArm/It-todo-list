import { ChangeEvent } from "react"
import { FilterValuesType } from "../App"
import { Button } from "./Button"
import { TodoListForm } from "./TodoListForm"
import { EditableSpan } from "./EditableSpan"




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
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodoTitle: (title: string, todolistId: string) => void
    filter: FilterValuesType
}

export const TodoList = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodoHandler = () => {
        props.removeTodoList(props.id)
    }
    
    const filterhandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }

    const changeTitle = (value: string) => {
        console.log('todo', value)
        props.changeTodoTitle(value, props.id)
    }

console.log('filter', props.filter)
    let tasksList: Array<JSX.Element> | JSX.Element = props.tasks.length > 0 ?
    props.tasks.map((t)=>{
        const onRemoveTask = ()=>{props.removeTask(t.id, props.id)}
        const onChengeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }


        const onChengeTitle = (value: string) => {
            props.changeTaskTitle(t.id, value, props.id)
        }
    
        
        
        return <li key={t.id} className={t.isdone ? 'is-done' : ''}>
                    <input type="checkbox" checked={t.isdone} onChange={onChengeStatusHandler}/> 
                    <EditableSpan title={t.title} onChange={onChengeTitle}/>
                    <Button name="X" callback={onRemoveTask}/>
                </li>
    }) : <span>no tasks</span>


    return (
        <div className="todolist">
                <h3><EditableSpan title={props.title} onChange={changeTitle}/><button onClick={removeTodoHandler}>x</button></h3>
                <TodoListForm addText={addTask}/>
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



