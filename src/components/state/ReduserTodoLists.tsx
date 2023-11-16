
import {v1} from "uuid";
import AppWithRedux, {TodoListType} from "../../AppWithRedux";


export type FilterValuesType = 'All' | 'completed' | 'active';

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

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const tdlId1 = v1()
export const tdlId2 = v1()

const initialState: TodoListType[] = [
    // {id: tdlId1, title: 'What to learn', filter: 'All'},
    // {id: tdlId2, title: 'What to buy', filter: 'All'}
]

export const ReducerTodoLists = (state: TodoListType[] = initialState , action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            {return state.filter(t => t.id !== action.id)}
        case 'ADD-TODOLIST':{
            return [{
                id: action.todoId,
                title: action.title,
                filter: 'All'
            }, ...state]}
        case 'CHANGE-TODOLIST-TITLE': {
            // const todoList = state.find(t => t.id === action.id)
            // if (todoList) {
            //     todoList.title = action.title
            // }
            // return [...state]
            // }
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            // const todoList = state.find(t => t.id === action.id)
            // if (todoList) {
            //     todoList.filter = action.filter
            // }
            // return [...state]
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
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
