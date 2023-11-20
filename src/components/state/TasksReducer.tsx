import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./ReduserTodoLists";
import {TasksStateType} from "../../AppWithRedux";

const REMOVETASK = 'REMOVE-TASK'
const ADDTASK = 'ADD-TASK'
const CHANGESTATUS = 'CHANGE-STATUS'
const CHANGETITLE = 'CHANGE-TITLE'
const ADDTODOLIST = "ADD-TODOLIST"

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeStatusType = ReturnType<typeof changeStatusAC>
type ChangeTitleType = ReturnType<typeof changeTitleAC>

type ActionsType = RemoveTaskType | AddTaskType | ChangeStatusType | ChangeTitleType | AddTodoListActionType | RemoveTodoListActionType

const initialState: TasksStateType = {
    // [tdlId1]: [
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    // ],
    // [tdlId2]: [
    //     {id: v1(), title: 'Coffee', isDone: true},
    //     {id: v1(), title: 'Bread', isDone: true},
    //     {id: v1(), title: 'Meat', isDone: false},
    // ],
}
export const TasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVETASK : {
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
        }
        case ADDTASK : {
            return {
                ...state,
                [action.payload.todoId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todoId]]
            }
        }
        case CHANGESTATUS : {
            return {...state,
                [action.payload.todoId]:  state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        }
        case CHANGETITLE : {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        case ADDTODOLIST : {
            // const newState = {...state}
            // newState[action.todoId] = []
            // return newState
            return {...state, [action.todoId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            // const newState = {...state}
            // delete newState[action.id]
            // return newState
            const {[action.id]: [], ...rest} = state
            return rest
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