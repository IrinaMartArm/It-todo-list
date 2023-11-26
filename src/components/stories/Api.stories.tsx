import {useEffect, useState} from "react";
import { TodoListsApi} from "../../api/TodoLists-api";


export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        TodoListsApi.getTodoLists()
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        TodoListsApi.createTodoLists('Suren')
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = ''
        TodoListsApi.deleteTodoLists(todoId)
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
        TodoListsApi.updateTodoLists(todoId, 'Suren and me')
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = ''
        TodoListsApi.getTasks(todoId)
            .then((res)=>{
                setState(res.data.items)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = ''
        TodoListsApi.createTask(todoId,'Suren')
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = ''
        const id = ''
        TodoListsApi.deleteTask(todoId, id)
            .then((res)=>{
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTaskHandler = () => {
        const todoId = ''
        const taskId = ''
        TodoListsApi.updateTask(todoId, taskId, 'Suren and me')
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

