
import {TasksStateType} from "../../App";
import {v1} from "uuid";

const REMOVETASK = 'REMOVE-TASK'
const ADDTASK = 'ADD-TASK'
const CHANGESTATUS = 'CHANGE-STATUS'
const CHANGETITLE = 'CHANGE-TITLE'

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeStatusType = ReturnType<typeof changeStatusAC>
type ChangeTitleType = ReturnType<typeof changeTitleAC>

type ActionsType = RemoveTaskType | AddTaskType | ChangeStatusType | ChangeTitleType


export const TasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVETASK : {
            const newState = {...state}
            const tasks = state[action.todoId]
            newState[action.todoId] = tasks.filter(t => t.id !== action.taskId)
            return newState
        }
        case ADDTASK : {
            const newState = {...state}
            const task = {
                id: v1(), title: action.payload.title, isDone: false
            }
            const tasks = newState[action.payload.todoId]
            newState[action.payload.todoId] = [task, ...tasks]
            return newState
        }
        case CHANGESTATUS : {
            const newState = {...state}
            let tasks = state[action.payload.todoId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if(task){task.isDone = action.payload.isDone}
            return newState
        }
        case CHANGETITLE : {
            const newState = {...state}
            let tasks = state[action.payload.todoId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if(task){task.title = action.payload.title}
            return newState
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: REMOVETASK,
        todoId: todoId,
        taskId: taskId
        // payload: {todoId, taskId}
    } as const
}
export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: ADDTASK,
        payload: {todoId, title}
    } as const
}
export const changeStatusAC = (todoId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGESTATUS,
        payload: {todoId, taskId, isDone}
    } as const
}

export const changeTitleAC = (todoId: string, taskId: string, title: string) => {
    return {
        type: CHANGETITLE,
        payload: {todoId, taskId, title}
    } as const
}