import {useEffect, useState} from "react";
import { TodoListsApi} from "../api/TodoLists-api";


export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        TodoListsApi.getTodoLists()
            .then((res)=>{
                setState(res)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        TodoListsApi.createTodoList('Suren')
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = 'b750e609-4745-4a8a-8a5d-4f5293fdc724'
        TodoListsApi.removeTodoList(todoId)
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = ''
        TodoListsApi.updateTodoList(todoId, 'Suren and me')
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}







export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')

    const getTasksHandler = () => {
        TodoListsApi.getTasks(todoId)
            .then((res)=>{
                setState(res)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoId}
                   placeholder={'todoId'}
                   onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <button onClick={getTasksHandler}>Get Tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTaskHandler = () => {

        TodoListsApi.removeTask(todoId, taskId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoId}
                   placeholder={'todoId'}
                   onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <input value={taskId}
                   placeholder={'taskId'}
                   onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTaskHandler}>delete</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTaskHandler = () => {

        TodoListsApi.createTask(todoId, title)
            .then((res)=>{
                setState(res)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoId}
                   placeholder={'todoId'}
                   onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <input value={title}
                   placeholder={'title'}
                   onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={createTaskHandler}>Create Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTaskHandler = () => {

        TodoListsApi.updateTask(todoId, taskId, {
            description: '',
            title: '',
            status: 1,
            priority: 1,
            startDate: '',
            deadline: ''
        })
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoId}
                   placeholder={'todoId'}
                   onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <input value={taskId}
                   placeholder={'taskId'}
                   onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <input value={title}
                   placeholder={'title'}
                   onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTaskHandler}>Update Task</button>
        </div>
    </div>
}





// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoId, setTodoId] = useState<string>('')
//
//     const getTaskHandler = () => {
//         TodoListsApi.getTasks(todoId)
//             .then((res)=>{
//                 setState(res.data.items)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input value={todoId}
//                    placeholder={'todoId'}
//                    onChange={(e) => setTodoId(e.currentTarget.value)}
//             />
//             <button onClick={getTaskHandler}>get tasks</button>
//         </div>
//     </div>
// }












// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//
//     useEffect(() => {
//         const todoId = ''
//         const id = ''
//         TodoListsApi.updateTask(todoId, id, 'Suren and me')
//             .then((res)=>{
//                 setState(res.data)
//             })
//     }, []);
//
//     const deleteTaskHandler = () => {
//
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <button onClick={deleteTaskHandler}>delete</button>
//         </div>
//     </div>
// }

