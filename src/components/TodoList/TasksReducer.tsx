import {addTodolistAC, changeEntityStatusAC, removeTodolistAC, setTodoAC} from "./ReduserTodoLists";
import {
    ResponseType,
    TaskPriorities,
    TaskStatuses,
    TaskTypeOfResponse,
    Api, UpdateApiModelType,
} from "../../api/Api";
import {Dispatch} from "redux";
import {AppDispatch, RootReducerType} from "../../App/Store";
import {setAppStatusAC} from "../../App/AppReducer";
import {handleAppError, handleNetworkError} from "../utils/ErrorUtils";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksStateType = {
    [key: string]: Array<TaskTypeOfResponse>
}

const initState: TasksStateType = {
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


const slice = createSlice({
    name: 'Tasks',
    initialState: initState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{todoId: string, taskId: string}>) {
            const task = state[action.payload.todoId].findIndex(t => t.id === action.payload.taskId)
            if(task > -1){
                state[action.payload.todoId].splice(task, 1)
            }
        },
        addTaskAC(state, action: PayloadAction< TaskTypeOfResponse>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{todoId: string, taskId: string, model: UpdateDomainModelType}>) {
            const tasks = state[action.payload.todoId]
            const task = tasks.findIndex(t => t.id === action.payload.taskId)
            if(task > -1){
                tasks[task] = {...tasks[task], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{todoId: string, tasks: Array<TaskTypeOfResponse>}>) {
            state[action.payload.todoId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
            builder.addCase(addTodolistAC, (state,      action) =>{
            state[action.payload.todoList.id] = []
        })
            builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
            builder.addCase(setTodoAC, (state, action) => {
            action.payload.todoLists.forEach((tl) => {
                state[tl.id] = []
            })
        })
    }
})

export  const TasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC,updateTaskAC, setTasksAC} = slice.actions


export const fetchTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await Api.getTasks(todoId)
        dispatch(setTasksAC({todoId, tasks: res}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (err) {
        if(axios.isAxiosError<ResponseType>(err)){
            const error = err.response?.data ? err.response?.data.messages[0] : err.message
            handleNetworkError(error, dispatch)
        } else {
            handleNetworkError((err as Error).message, dispatch)
        }
    }
}

export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeEntityStatusAC({id: todoId, entityStatus: 'loading'}))
        try {
            const res = await Api.removeTask(todoId, taskId)
            if(res.data.resultCode === 0){
                dispatch(removeTaskAC({todoId, taskId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleAppError(res.data, dispatch)
            }
        }
        catch (err) {
            if(axios.isAxiosError<ResponseType>(err)){
                const error = err.response?.data ? err.response?.data.messages[0] : err.message
                handleNetworkError(error, dispatch)
            } else {
                handleNetworkError((err as Error).message, dispatch)
            }
            dispatch(changeEntityStatusAC({id: todoId, entityStatus: 'idle'}))
        }
        finally {
            dispatch(setAppStatusAC({status: 'idle'}))
            dispatch(changeEntityStatusAC({id: todoId, entityStatus: 'idle'}))
        }
}

export const addTaskTC = (todoId: string, title: string) => async (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await Api.createTask(todoId, title)
        if (res.resultCode === 0) {
            dispatch(addTaskAC(res.data.item))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (err){
        if(axios.isAxiosError<ResponseType>(err)){
            const error = err.response?.data ? err.response?.data.messages[0] : err.message
            handleNetworkError(error, dispatch)
        } else {
            handleNetworkError((err as Error).message, dispatch)
        }
    }
}


export type UpdateDomainModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainModelType) =>
        async (dispatch: Dispatch, getState: () => RootReducerType) => {
            dispatch(setAppStatusAC({status: 'loading'}))
            let state = getState()
            const task = state.tasks[todoId].find(t => t.id === taskId)
            if(!task){
                console.log("error")
                return
            }
            const apiModel: UpdateApiModelType = {
                description: task.description,
                title: task.title,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            try {
                const res = await Api.updateTask(todoId, taskId, apiModel)
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todoId, taskId, model: domainModel}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleAppError(res.data, dispatch)
                }
            } catch (err) {
                if(axios.isAxiosError<ResponseType>(err)){
                    const error = err.response?.data ? err.response?.data.messages[0] : err.message
                    handleNetworkError(error, dispatch)
                } else {
                    handleNetworkError((err as Error).message, dispatch)
                }
            }
}





// export const TasksReducer = (state: TasksStateType = initState, action: TasksActionsType): TasksStateType => {
//     switch (action.type) {
//         case REMOVETASK : {
//             return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
//         }
//         case ADDTASK : {
//             return {
//                 ...state,
//                 [action.payload.task.todoListId]:
//                     [action.payload.task , ...state[action.payload.task.todoListId]]
//             }
//         }
//         case UPDATETASK : {
//             return {...state,
//                 [action.payload.todoId]:  state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)}
//         }
//         case ADDTODOLIST : {
//             return {...state, [action.todoList.id]: []}
//         }
//         case 'REMOVE-TODOLIST' : {
//             // const newState = {...state}
//             // delete newState[action.id]
//             // return newState
//             const {[action.id]: [], ...rest} = state
//             return rest
//         }
//         case 'SETTODO': {
//             const stateCopy = {...state}
//             action.todoLists.forEach((tl) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy;
//         }
//         case 'SET-TASKS': {
//             return {...state, [action.todoId]: action.tasks}
//         }
//         default:
//             return state
//     }
// }


// export const removeTaskAC = (todoId: string, taskId: string) => {
//     return {
//         type: REMOVETASK,
//         todoId: todoId,
//         taskId: taskId
//         // payload: {todoId, taskId}
//     } as const
// }
// export const addTaskAC = (task: TaskTypeOfResponse) => {
//     return {
//         type: ADDTASK,
//         payload: {task}
//     } as const
// }
// export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainModelType) => {
//     return {
//         type: UPDATETASK,
//         payload: {todoId, taskId, model}
//     } as const
// }
//
// export const setTasksAC = (todoId: string, tasks: Array<TaskTypeOfResponse>) => {
//     return {type: 'SET-TASKS', todoId, tasks} as const
// }

//
// const REMOVETASK = 'REMOVE-TASK'
// const ADDTASK = 'ADD-TASK'
// const UPDATETASK = 'UPDATE-TASK'
// const ADDTODOLIST = "ADD-TODOLIST"
//
// type RemoveTaskType = ReturnType<typeof removeTaskAC>
// type AddTaskType = ReturnType<typeof addTaskAC>
// type UpdateTaskACType = ReturnType<typeof updateTaskAC>
// type setTasksType = ReturnType<typeof setTasksAC>
//
//
// export type TasksActionsType = RemoveTaskType | AddTaskType | UpdateTaskACType | AddTodoListActionType | RemoveTodoListActionType | setTasksType | setTodoActionType
//
