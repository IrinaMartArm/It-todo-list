import { FilterValuesType } from "../App"
import { TodoListForm } from "./TodoListForm"
import { EditableSpan } from "./EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import {Delete} from "@mui/icons-material"
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {addTaskAC} from "./state/TasksReducer";
import React, {useCallback} from "react";
import {Task} from './Task'



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    id: string
    removeTodoList: (todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeTodoTitle: (todolistId: string, title: string) => void
    filter: FilterValuesType
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('TodoList')

    const dispatch = useDispatch()

    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[props.id])


    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [props.id])

    const removeTodoHandler = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id])

    const allFilterHandler = useCallback(() => {props.changeFilter(props.id, 'All')}, [props.changeFilter, props.id])
    const activeFilterHandler = useCallback(() => {props.changeFilter(props.id, 'active')}, [props.changeFilter, props.id])
    const completedFilterHandler = useCallback(() => {props.changeFilter(props.id, 'completed')}, [props.changeFilter, props.id])

    const changeTitle = useCallback((value: string) => {
        console.log('todo', value)
        props.changeTodoTitle(props.id, value)
    }, [props.changeTodoTitle, props.id])





    let tasksForList = tasks
    if(props.filter === 'completed') {
        tasksForList = tasksForList.filter(t => t.isDone)
    }
    if(props.filter === 'active') {
        tasksForList = tasksForList.filter(t => !t.isDone)
    }


    let tasksList: Array<JSX.Element> | JSX.Element = tasks.length > 0 ?
        tasksForList.map(t => <Task key={t.id} tdId={props.id} task={t}/>) : <span>no tasks</span>


    return (
        <div className="todolist">
            <h3><EditableSpan title={props.title} onChange={changeTitle}/>
                <IconButton onClick={removeTodoHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <TodoListForm addText={addTask}/>
            <ul>
                {/*{tasksForList.map(t => <Task key={t.id} tdId={props.id} task={t} />)}*/}
                {tasksList}
            </ul>
            <div>
                <Button onClick={allFilterHandler} name='All'  variant={props.filter === 'All' ? "outlined" : 'text'}>All</Button>
                <Button onClick={activeFilterHandler} name='Active'  variant={props.filter === 'active' ? "outlined" : 'text'} color="primary">Active</Button>
                <Button onClick={completedFilterHandler} name='Completed'  variant={props.filter === 'completed' ? "outlined" : 'text'} color="secondary">Completed</Button>
            </div>
        </div>
    )
})


