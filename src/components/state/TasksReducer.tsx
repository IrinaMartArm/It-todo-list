import {AddTodoListActionType, RemoveTodoListActionType, setTodoActionType} from "./ReduserTodoLists";
import {
    TaskPriorities,
    TaskStatuses,
    TaskTypeOfResponse,
    TodoListsApi, UpdateApiModelType,
} from "../../api/TodoLists-api";
import {Dispatch} from "redux";
import {AppDispatch, RootReducerType} from "./Store";
import {setErrorAC, setStatusAC} from "./AppReducer";


const REMOVETASK = 'REMOVE-TASK'
const ADDTASK = 'ADD-TASK'
const UPDATETASK = 'UPDATE-TASK'
const ADDTODOLIST = "ADD-TODOLIST"

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksType = ReturnType<typeof setTasksAC>


export type TasksActionsType = RemoveTaskType | AddTaskType | UpdateTaskACType | AddTodoListActionType | RemoveTodoListActionType | setTasksType | setTodoActionType

export type TasksStateType = {
    [key: string]: Array<TaskTypeOfResponse>
}

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
export const TasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVETASK : {
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
        }
        case ADDTASK : {
            return {
                ...state,
                [action.payload.task.todoListId]:
                    [action.payload.task , ...state[action.payload.task.todoListId]]
            }
        }
        case UPDATETASK : {
            return {...state,
                [action.payload.todoId]:  state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)}
        }
        case ADDTODOLIST : {
            return {...state, [action.todoList.id]: []}
        }
        case 'REMOVE-TODOLIST' : {
            // const newState = {...state}
            // delete newState[action.id]
            // return newState
            const {[action.id]: [], ...rest} = state
            return rest
        }
        case 'SET-TODO': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.todoId]: action.tasks}
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
export const addTaskAC = (task: TaskTypeOfResponse) => {
    return {
        type: ADDTASK,
        payload: {task}
    } as const
}
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainModelType) => {
    return {
        type: UPDATETASK,
        payload: {todoId, taskId, model}
    } as const
}

export const setTasksAC = (todoId: string, tasks: Array<TaskTypeOfResponse>) => {
    return {type: 'SET-TASKS', todoId, tasks} as const
}

export const fetchTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        const res = await TodoListsApi.getTasks(todoId)
        dispatch(setTasksAC(todoId, res))
        dispatch(setStatusAC('succeeded'))
}

export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        await TodoListsApi.removeTask(todoId, taskId)
        dispatch(removeTaskAC(todoId, taskId))
        dispatch(setStatusAC('succeeded'))
}

export const addTaskTC = (todoId: string, title: string) => async (dispatch: AppDispatch) => {
        dispatch(setStatusAC('loading'))
        const res = await TodoListsApi.createTask(todoId, title)
        if(res.resultCode === 0) {
            dispatch(addTaskAC(res.data.item))
            dispatch(setStatusAC('succeeded'))
        } else {
            if(res.messages.length) {
                dispatch(setErrorAC(res.messages[0]))
            } else {
                dispatch(setErrorAC('some error'))
            }
            dispatch(setStatusAC('failed'))
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

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainModelType) => {
        return async (dispatch: Dispatch, getState: ()=>RootReducerType) => {
            dispatch(setStatusAC('loading'))
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
            await TodoListsApi.updateTask(todoId, taskId, apiModel)
                    dispatch(updateTaskAC(todoId, taskId, domainModel))
                    dispatch(setStatusAC('succeeded'))
        }
    }

