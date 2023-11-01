import {TaskType} from "../TodoList";
import {v1} from "uuid";

export const TaskReducer = (state: TaskType[], action: TsarType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return [newTask, ...state]
        }
        case 'CHANGE-STATUS': {
           let task = state.find(s => s.id === action.payload.id)
            if(task){task.isDone = action.payload.isDone}
            return [...state]
        }
        case 'CHANGE-TITLE': {
            const task = state.find(t => t.id === action.payload.taskId)
            if(task){task.title = action.payload.title}
            return [...state]
        }
        default:
            return state
    }
}

type TsarType = RemoveTaskType | AddTaskType | ChangeStatusType |  ChangeTitleType
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeStatusType = ReturnType<typeof changeStatusAC>
type ChangeTitleType = ReturnType<typeof changeTitleAC>
export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id}
    }as const
}

export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title}
    }as const
}
export const changeStatusAC = (id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {id, isDone}
    }as const
}
export const changeTitleAC = (taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {taskId, title}
    }as const
}
