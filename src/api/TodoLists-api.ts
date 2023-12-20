import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
            'API-KEY': '6188de65-874c-45aa-9d34-0633fd77b565'
        }
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
    data: D
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

export type UpdateApiModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type TaskResponseType = {
    totalCount: string | null
    error: string | null
    items: Array<TaskTypeOfResponse>
}


export const TodoListsApi = {
    async getTodoLists() {
        let resp = await
        instance.get<Array<TodoListsTypeOfResponse>>('todo-lists')
        return resp.data
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListsTypeOfResponse}>>("todo-lists",{title})
    },
    removeTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`,{title})
    },
    async getTasks(todoId: string) {
        let resp = await instance.get<TaskResponseType>(`todo-lists/${todoId}/tasks`)
        return resp.data.items
    },
    removeTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    async createTask(todoId: string, title: string) {
        const resp = await instance.post<ResponseType<{ item: TaskTypeOfResponse }>, AxiosResponse<ResponseType<{item: TaskTypeOfResponse}>>, {title: string}>(`todo-lists/${todoId}/tasks`, {title})
        return resp.data;
    },
    updateTask(todoId: string, taskId: string, model: UpdateApiModelType) {
        return instance.put<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    },
}

export type Params = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const AuthApi = {
    authMe(params: Params){
        return instance.post<ResponseType<{userId?: number}>>('auth/login', params)
    }
}


