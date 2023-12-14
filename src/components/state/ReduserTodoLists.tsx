import {TodoListsApi, TodoListsTypeOfResponse} from "../../api/TodoLists-api";
import {Dispatch} from "redux";
import {RequestStatus, setAppStatusAC} from "./AppReducer";



export type FilterValuesType = 'all' | 'completed' | 'active';

export type TogoDomainType = TodoListsTypeOfResponse & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoList: TodoListsTypeOfResponse
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type setTodoActionType = ReturnType<typeof setTodoAC>

export type TodoListActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | setTodoActionType
    | ReturnType<typeof changeEntityStatusAC>


const initialState: TogoDomainType[] = []

export const ReducerTodoLists = (state: TogoDomainType[] = initialState , action: TodoListActionsType): TogoDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            {return state.filter(t => t.id !== action.id)}
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'CHANGE-ENTITY-STATUS':
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
        case 'SET-TODO':
            return action.todoLists.map(td => {
                return {...td, filter: 'all', entityStatus: "idle"}
            })
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todoList: TodoListsTypeOfResponse): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoList} as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodoAC = (todoLists: TodoListsTypeOfResponse[]) => {
    return {type: 'SET-TODO', todoLists} as const
}
export const changeEntityStatusAC = (id: string, status: RequestStatus) => {
    return {type: 'CHANGE-ENTITY-STATUS', id, status} as const
}





export const fetchTodoListsTC = () => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        const res = await TodoListsApi.getTodoLists()
                dispatch(setTodoAC(res))
                dispatch(setAppStatusAC('succeeded'))
    }


export const removeTodoTC = (id: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeEntityStatusAC(id, 'loading'))
        await TodoListsApi.removeTodoList(id)
               dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC('succeeded'))
    }


export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        const res = await TodoListsApi.createTodoList(title)
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
    }


export const changeTodoTitleTC = (id: string, title: string) => async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        await TodoListsApi.updateTodoList(id, title)
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
    }
