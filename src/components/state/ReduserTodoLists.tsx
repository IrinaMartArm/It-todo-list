import {ResponseType, TodoListsApi, TodoListsTypeOfResponse} from "../../api/TodoLists-api";
import {Dispatch} from "redux";
import {RequestStatus, setAppStatusAC} from "./AppReducer";
import {handleAppError, handleNetworkError} from "../utils/ErrorUtils";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TogoDomainType = TodoListsTypeOfResponse & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}


const initialState: TogoDomainType[] = []

const slice = createSlice({
    name: 'TodoLists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{todolistId: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index){
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todoList: TodoListsTypeOfResponse }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index){
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index){
                state[index].filter = action.payload.filter
            }
        },
        setTodoAC(state, action: PayloadAction<{todoLists: TodoListsTypeOfResponse[]}>) {
            return  action.payload.todoLists.map(tl =>
                ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatus}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index){
                state[index].entityStatus = action.payload.entityStatus
            }
        },
    }
})
export const ReducerTodoLists = slice.reducer;
export const {removeTodolistAC, addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, changeEntityStatusAC, setTodoAC} = slice.actions



export const fetchTodoListsTC = () => async (dispatch: Dispatch) => {
        // dispatch(setAppStatusAC('loading'))
        try {
            const res = await TodoListsApi.getTodoLists()
            dispatch(setTodoAC({todoLists: res}))
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


export const removeTodoTC = (id: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeEntityStatusAC({id, entityStatus: 'loading'}))
    try {
        const res = await TodoListsApi.removeTodoList(id)
        if(res.data.resultCode === 0) {
            dispatch(removeTodolistAC({todolistId: id}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleAppError(res.data, dispatch)
        }
    }
    catch (err) {
        dispatch(changeEntityStatusAC({id, entityStatus: 'idle'}))
        if(axios.isAxiosError<ResponseType>(err)){
            const error = err.response?.data ? err.response?.data.messages[0] : err.message
            handleNetworkError(error, dispatch)
        } else {
            handleNetworkError((err as Error).message, dispatch)
        }
    }
}


export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await TodoListsApi.createTodoList(title)
            if(res.data.resultCode === 0) {
                dispatch(addTodolistAC({todoList: res.data.data.item}))
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

export const changeTodoTitleTC = (id: string, title: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await TodoListsApi.updateTodoList(id, title)
        if(res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC({id, title}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleAppError(res.data, dispatch)
        }
    }catch (err){
        if(axios.isAxiosError<ResponseType>(err)){
            const error = err.response?.data ? err.response?.data.messages[0] : err.message
            handleNetworkError(error, dispatch)
        } else {
            handleNetworkError((err as Error).message, dispatch)
        }
    }
}

// export type RemoveTodoListActionType = {
//     type: 'REMOVE-TODOLIST'
//     id: string
// }
// export type AddTodoListActionType = {
//     type: 'ADD-TODOLIST'
//     todoList: TodoListsTypeOfResponse
// }
// export type ChangeTodoListTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     id: string
//     title: string
// }
// export type setTodoActionType = ReturnType<typeof setTodoAC>
//
// export type TodoListActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType
//     | ReturnType<typeof changeTodolistFilterAC>
//     | setTodoActionType
//     | ReturnType<typeof changeEntityStatusAC>
//

// export const ReducerTodoLists = (state: TogoDomainType[] = initialState , action: TodoListActionsType): TogoDomainType[] => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             {return state.filter(t => t.id !== action.id)}
//         case 'ADD-TODOLIST':
//             return [{...action.todoList, filter: 'all', entityStatus: "idle"}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
//         case 'CHANGE-ENTITY-STATUS':
//             return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
//         case 'SET-TODO':
//             return action.todoLists.map(td => {
//                 return {...td, filter: 'all', entityStatus: "idle"}
//             })
//         default:
//             return state
//     }
// }
//   ActionCreators
// export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId} as const
// }
// export const addTodolistAC = (todoList: TodoListsTypeOfResponse): AddTodoListActionType => {
//     return {type: 'ADD-TODOLIST', todoList} as const
// }
//
// export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
// }
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
// }
// export const setTodoAC = (todoLists: TodoListsTypeOfResponse[]) => {
//     return {type: 'SET-TODO', todoLists} as const
// }
// export const changeEntityStatusAC = (id: string, status: RequestStatus) => {
//     return {type: 'CHANGE-ENTITY-STATUS', id, status} as const
// }



