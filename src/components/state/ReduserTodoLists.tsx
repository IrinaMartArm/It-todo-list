
import {v1} from "uuid";
import {TodoListsApi, TodoListsTypeOfResponse} from "../../api/TodoLists-api";
import {Dispatch} from "redux";



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
    todoList: TodoListsTypeOfResponse
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
        case 'ADD-TODOLIST': {
            return [{...action.todoList, filter: 'all'}, ...state]}
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
export const addTodolistAC = (todoList: TodoListsTypeOfResponse): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoList}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodoAC = (todoLists: TodoListsTypeOfResponse[]): setTodoActionType => {
    return {type: 'SET-TODO', todoLists}
}


export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        TodoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodoAC(res.data))
            })
    }
}

export const removeTodoTC = (id: string) => {
    return (dispatch: Dispatch) => {
        TodoListsApi.removeTodoList(id)
            .then(() => {
               dispatch(removeTodolistAC(id))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        TodoListsApi.createTodoList(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodoTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodoListsApi.updateTodoList(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}