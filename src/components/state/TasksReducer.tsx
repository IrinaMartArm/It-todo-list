import {AddTodoListActionType, RemoveTodoListActionType, setTodoActionType} from "./ReduserTodoLists";
import {
    TaskPriorities,
    TaskStatuses,
    TaskTypeOfResponse,
    TodoListsApi, UpdateApiModelType,
} from "../../api/TodoLists-api";
import {Dispatch} from "redux";
import {RootReducerType} from "./Store";


const REMOVETASK = 'REMOVE-TASK'
const ADDTASK = 'ADD-TASK'
const UPDATETASK = 'UPDATE-TASK'
const ADDTODOLIST = "ADD-TODOLIST"

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksType = ReturnType<typeof setTasksAC>


type ActionsType = RemoveTaskType | AddTaskType | UpdateTaskACType | AddTodoListActionType | RemoveTodoListActionType | setTasksType | setTodoActionType

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
export const TasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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

export const fetchTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        TodoListsApi.getTasks(todoId)
            .then((res) => {
                dispatch(setTasksAC(todoId, res.data.items))
            })
    }
}

export const removeTaskTC = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        TodoListsApi.removeTask(todoId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todoId, taskId))
            })
    }
}

export const addTaskTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodoListsApi.createTask(todoId, title)
            .then((res)=> {
                dispatch(addTaskAC(res.data.data.item))
            })
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
        return (dispatch: Dispatch, getState: ()=>RootReducerType) => {
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
            TodoListsApi.updateTask(todoId, taskId, apiModel)
                .then(() => {
                    dispatch(updateTaskAC(todoId, taskId, domainModel))
                })
        }
    }

