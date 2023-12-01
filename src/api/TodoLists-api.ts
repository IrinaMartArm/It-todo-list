import axios from "axios";


const settings = {
    withCredentials: true,
    // headers: {
    //     'API-KEY': '6188de65-874c-45aa-9d34-0633fd77b565'
    // }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TodoListsTypeOfResponse = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: {}
}

export type TaskTypeOfResponse = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TaskResponseType = {
    totalCount: string | null
    error: string | null
    items: Array<TaskTypeOfResponse>
}


export const TodoListsApi = {
    getTodoLists() {
        return instance.get<Array<TodoListsTypeOfResponse>>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{item: TodoListsTypeOfResponse}>>("todo-lists",{title})
    },
    deleteTodoLists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoLists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`,{title})
    },
    getTasks(todoId: string) {
        return instance.get<TaskResponseType>(`todo-lists/${todoId}/tasks`)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseType<{item: TaskTypeOfResponse}>>(`todo-lists/${todoId}/tasks`,{title})
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`,{model})
    },
}


// updateTask(todoId: string, id: string, title: string, model: UpdateTaskType) {
//     return instance.put<ResponseType>(`todo-lists/${todoId}/tasks/${id}`,{title})
// },