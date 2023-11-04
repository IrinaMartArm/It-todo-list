import { FilterValuesType } from "../App"
import { TodoListForm } from "./TodoListForm"
import { EditableSpan } from "./EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import { Delete } from "@mui/icons-material"
import {CheckBox} from "./CheckBox";




export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    removeTodoList: (todolistId: string) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
    
    const filterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.id, value)
    }

    const changeTitle = (value: string) => {
        console.log('todo', value)
        props.changeTodoTitle(props.id, value)
    }

    const onChangeStatusHandler = (id: string, checked: boolean) => {
        props.changeStatus(props.id, id, checked)
    }

console.log('filter', props.filter)
    let tasksList: Array<JSX.Element> | JSX.Element = props.tasks.length > 0 ?
    props.tasks.map((t)=>{
        const onRemoveTask = ()=>{props.removeTask(props.id, t.id)}

        const onChangeTitle = (value: string) => {
            props.changeTaskTitle(props.id, t.id, value)
        }

        
        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <CheckBox checked={t.isDone} onChange={(checked)=>onChangeStatusHandler(t.id, checked)}/>
                    <EditableSpan title={t.title} onChange={onChangeTitle}/>
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
                    <Button onClick={()=>filterHandler('All')} name='All'  variant={props.filter === 'All' ? "outlined" : 'text'}>All</Button>
                    <Button onClick={()=>filterHandler('active')} name='Active'  variant={props.filter === 'active' ? "outlined" : 'text'} color="primary">Active</Button>
                    <Button onClick={()=>filterHandler('completed')} name='Completed'  variant={props.filter === 'completed' ? "outlined" : 'text'} color="secondary">Completed</Button>
                    {/* <Button onClick={()=>filterhandler('All')} name='All' variant={props.filter === 'All' ? "contained" : 'text'}>All</Button> */}
                    {/* <Button onClick={()=>filterhandler('active')} name='Active' className={props.filter === 'active' ? "active-filter" : ''}>All</Button>
                    <Button onClick={()=>filterhandler('completed')} name='Completed' className={props.filter === 'completed' ? "active-filter" : ''}>All</Button> */}
                </div>
            </div>
    )
}



