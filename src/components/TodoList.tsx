import { ChangeEvent } from "react"
import { FilterValuesType } from "../App"
import { TodoListForm } from "./TodoListForm"
import { EditableSpan } from "./EditableSpan"
import { Button, Checkbox, IconButton } from "@material-ui/core"
import { Delete } from "@mui/icons-material"




export type TaskType = {
    id: string
    title: string
    isdone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    removeTodoList: (todolistId: string) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeStatus: (todolistId: string, taskId: string, isdone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoTitle: (todolistId: string, title: string) => void
    filter: FilterValuesType
}

export const TodoList = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const removeTodoHandler = () => {
        props.removeTodoList(props.id)
    }
    
    const filterhandler = (value: FilterValuesType) => {
        props.changeFilter(props.id, value)
    }

    const changeTitle = (value: string) => {
        console.log('todo', value)
        props.changeTodoTitle(props.id, value)
    }

console.log('filter', props.filter)
    let tasksList: Array<JSX.Element> | JSX.Element = props.tasks.length > 0 ?
    props.tasks.map((t)=>{
        const onRemoveTask = ()=>{props.removeTask(props.id, t.id)}
        const onChengeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(props.id, t.id, e.currentTarget.checked)
        }


        const onChengeTitle = (value: string) => {
            props.changeTaskTitle(props.id, t.id, value)
        }
    
        
        
        return <li key={t.id} className={t.isdone ? 'is-done' : ''}>
                    <Checkbox checked={t.isdone} onChange={onChengeStatusHandler}/> 
                    <EditableSpan title={t.title} onChange={onChengeTitle}/>
                    {/* <ButtonS name="X" callback={onRemoveTask}/> */}
                    <IconButton onClick={onRemoveTask}>
                        <Delete />
                    </IconButton>
                </li>
        // return <li key={t.id} className={t.isdone ? 'is-done' : ''}>
        //             <input type="checkbox" checked={t.isdone} onChange={onChengeStatusHandler}/> 
        //             <EditableSpan title={t.title} onChange={onChengeTitle}/>
        //             {/* <ButtonS name="X" callback={onRemoveTask}/> */}
        //             <IconButton onClick={onRemoveTask}>
        //                 <Delete />
        //             </IconButton>
        //         </li>
    }) : <span>no tasks</span>


    return (
        <div className="todolist">
                {/* <h3><EditableSpan title={props.title} onChange={changeTitle}/><button onClick={removeTodoHandler}>x</button></h3> */}
                <h3><EditableSpan title={props.title} onChange={changeTitle}/>
                <IconButton onClick={removeTodoHandler}>
                        <Delete />
                </IconButton>
                </h3>
                <TodoListForm addText={addTask}/>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button onClick={()=>filterhandler('All')} name='All'  variant={props.filter === 'All' ? "outlined" : 'text'}>All</Button>
                    <Button onClick={()=>filterhandler('active')} name='Active'  variant={props.filter === 'active' ? "outlined" : 'text'} color="primary">Active</Button>
                    <Button onClick={()=>filterhandler('completed')} name='Completed'  variant={props.filter === 'completed' ? "outlined" : 'text'} color="secondary">Completed</Button>
                    {/* <Button onClick={()=>filterhandler('All')} name='All' variant={props.filter === 'All' ? "contained" : 'text'}>All</Button> */}
                    {/* <Button onClick={()=>filterhandler('active')} name='Active' className={props.filter === 'active' ? "active-filter" : ''}>All</Button>
                    <Button onClick={()=>filterhandler('completed')} name='Completed' className={props.filter === 'completed' ? "active-filter" : ''}>All</Button> */}
                </div>
            </div>
    )
}



