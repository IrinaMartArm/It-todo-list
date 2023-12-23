import React, {useCallback, useState} from "react";
import {removeTaskTC, updateTaskTC} from "./TasksReducer";
import {CheckBox} from "../Elements/CheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import {TaskStatuses, TaskTypeOfResponse} from "../../api/TodoLists-api";
import {useAppDispatch} from "../hooks/Hooks";
import IconButton from "@mui/material/IconButton";


type TaskProps = {
    todoId : string
    task: TaskTypeOfResponse
}

export const Task = React.memo((props: TaskProps) => {

    const dispatch = useAppDispatch()
    const [isDisabled, setIsDisabled] = useState(false)

    const onRemoveTask = useCallback(()=>{
        setIsDisabled(true)
        dispatch(removeTaskTC(props.todoId, props.task.id))
            .then(() => setIsDisabled(false))
    }, [props.todoId, props.task.id])  // props.removeTask(props.id, t.id)

    const onChangeStatusHandler = useCallback((status: TaskStatuses)=>{
        dispatch(updateTaskTC(props.todoId, props.task.id, {status: status}))}, [props.todoId, props.task.id])


    const onChangeTitle = useCallback((title: string) => {dispatch(updateTaskTC(props.todoId, props.task.id, {title}))}, [props.todoId, props.task.id])


    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <CheckBox status={props.task.status} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitle}/>
            <IconButton onClick={onRemoveTask} disabled={isDisabled}>
                <Delete/>
            </IconButton>
        </li>
    )
})