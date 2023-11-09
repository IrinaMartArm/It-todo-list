import { FilterValuesType } from "../App"
import { TodoListForm } from "./TodoListForm"
import { EditableSpan } from "./EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import { Delete } from "@mui/icons-material"
import {CheckBox} from "./CheckBox";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC} from "./state/TasksReducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
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
    const dispatch = useDispatch()

    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[props.id])

    // const removeTask = (todolistId: string, id: string) => {
    //     dispatch(removeTaskAC(todolistId, id))
    // }

    // const addTask = (todolistId: string, title: string) => {
    //     dispatch(addTaskAC(todolistId, title))
    // }

    // const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    //     dispatch(changeStatusAC(todolistId, taskId, isDone))
    // }
    // const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    //     dispatch(changeTitleAC(todolistId, taskId, title))
    // }





    const addTask = (title: string) => {
        // props.addTask(props.id, title)
        dispatch(addTaskAC(props.id, title))
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
        // props.changeStatus(props.id, id, checked)
        dispatch(changeStatusAC(props.id, id, checked))
    }


    let tasksList: Array<JSX.Element> | JSX.Element = tasks.length > 0 ?
    tasks.map((t)=>{
        const onRemoveTask = ()=>{dispatch(removeTaskAC(props.id, t.id))}   // props.removeTask(props.id, t.id)

        const onChangeTitle = (value: string) => {dispatch(changeTitleAC(props.id, t.id, value))}   // props.changeTaskTitle(props.id, t.id, value)

        
        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <CheckBox checked={t.isDone} onChange={(checked)=>onChangeStatusHandler(t.id, checked)}/>
                    <EditableSpan title={t.title} onChange={onChangeTitle}/>
                    <IconButton onClick={onRemoveTask}>
                        <Delete />
                    </IconButton>
                </li>
    }) : <span>no tasks</span>


    return (
        <div className="todolist">
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
                </div>
            </div>
    )
}



