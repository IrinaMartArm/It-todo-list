import { TodoListForm } from "./TodoListForm"
import { EditableSpan } from "./EditableSpan"
import {IconButton} from "@material-ui/core"
import {Delete} from "@mui/icons-material"
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {addTaskAC} from "./state/TasksReducer";
import React, {useCallback} from "react";
import {Task} from './Task'
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/ReduserTodoLists";
import {ButtonUI} from "./ButtonUI";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
   // todoList: TodoListType
    id: string
    filter: string
    title: string
}

export const TodoListRedux = React.memo((props: PropsType) => {
    console.log('TodoList')

    const {id, filter, title} = props

    const dispatch = useDispatch()

    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[id])


    const addText = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [id])

    const removeTodoHandler = useCallback(() => {
        // props.removeTodoList(id)
        dispatch(removeTodolistAC(id))
    }, [id])

    const changeTodoListTitle = useCallback((value: string) => {
        console.log('todo', value)
        dispatch(changeTodolistTitleAC(id, value))
        // props.changeTodoTitle(id, value)
    }, [id])


    const allFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'All'))}, [id])
    const activeFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'active'))}, [id])
    const completedFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'completed'))}, [id])




    let tasksForList = tasks
    if(filter === 'completed') {
        tasksForList = tasksForList.filter(t => t.isDone)
    }
    if(filter === 'active') {
        tasksForList = tasksForList.filter(t => !t.isDone)
    }


    let tasksList: Array<JSX.Element> | JSX.Element = tasks.length > 0 ?
        tasksForList.map(t => <Task key={t.id} todoId={id} task={t}/>) : <span>no tasks</span>


    return (
        <div className="todolist">
            <h3><EditableSpan title={title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <TodoListForm addText={addText}/>
            <ul>
                {/*{tasksForList.map(t => <Task key={t.id} tdId={props.id} task={t} />)}*/}
                {tasksList}
            </ul>
            <div>
                <ButtonUI onClick={allFilterHandler} name='All' color={'inherit'} variant={filter === 'All' ? "outlined" : 'text'}/>
                <ButtonUI onClick={activeFilterHandler} name='Active' color={"primary"} variant={filter === 'active' ? "outlined" : 'text'}/>
                <ButtonUI onClick={completedFilterHandler} name='Completed' color={"secondary"} variant={filter === 'completed' ? "outlined" : 'text'}/>
            </div>
        </div>
    )
})


{/*<Button onClick={allFilterHandler} name='All'  variant={filter === 'All' ? "outlined" : 'text'}>All</Button>*/}
{/*<Button onClick={activeFilterHandler} name='Active'  variant={filter === 'active' ? "outlined" : 'text'} color="primary">Active</Button>*/}
{/*<Button onClick={completedFilterHandler} name='Completed'  variant={filter === 'completed' ? "outlined" : 'text'} color="secondary">Completed</Button>*/}