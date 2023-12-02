
import {v1} from "uuid";
import {TodoListsTypeOfResponse} from "../../api/TodoLists-api";



export type FilterValuesType = 'all' | 'completed' | 'active';

export type TogoDomainType = TodoListsTypeOfResponse & {
    filter: FilterValuesType
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoId: string
    title: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

// export type setTodoActionType = ReturnType<typeof setTodoAC>
export type setTodoActionType = {
    type: 'SET-TODO'
    todoLists: TodoListsTypeOfResponse[]
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType | setTodoActionType

export const tdlId1 = v1()
export const tdlId2 = v1()

const initialState: TogoDomainType[] = [
    // {id: tdlId1, title: 'What to learn', filter: 'all'},
    // {id: tdlId2, title: 'What to buy', filter: 'all'}
]

export const ReducerTodoLists = (state: TogoDomainType[] = initialState , action: ActionType): TogoDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            {return state.filter(t => t.id !== action.id)}
        case 'ADD-TODOLIST':{
            return [{
                id: action.todoId,
                title: action.title,
                order: 0,
                addedDate: '',
                filter: 'all'
            }, ...state]}
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case 'SET-TODO': {
            return action.todoLists.map(td => {
                return {...td, filter: 'all'}
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoId: v1(), title: title}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodoAC = (todoLists: TodoListsTypeOfResponse[]): setTodoActionType => {
    return {type: 'SET-TODO', todoLists: todoLists}
}
