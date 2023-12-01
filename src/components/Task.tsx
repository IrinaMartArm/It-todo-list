import {useDispatch} from "react-redux";
import React, {useCallback} from "react";
import {changeStatusAC, changeTitleAC, removeTaskAC} from "./state/TasksReducer";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskTypeOfResponse} from "../api/TodoLists-api";


type TaskProps = {
    todoId : string
    task: TaskTypeOfResponse
}

export const Task = React.memo((props: TaskProps) => {

    const dispatch = useDispatch()
    const onRemoveTask = useCallback(()=>{dispatch(removeTaskAC(props.todoId, props.task.id))}, [props.todoId, props.task.id])  // props.removeTask(props.id, t.id)

    const onChangeStatusHandler = useCallback((status: TaskStatuses)=>{dispatch(changeStatusAC(props.todoId, props.task.id, status))}, [props.todoId, props.task.id])

    const onChangeTitle = useCallback((value: string) => {dispatch(changeTitleAC(props.todoId, props.task.id, value))}, [props.todoId, props.task.id])


    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <CheckBox status={props.task.status} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitle}/>
            <IconButton onClick={onRemoveTask}>
                <Delete />
            </IconButton>
        </li>
    )
})