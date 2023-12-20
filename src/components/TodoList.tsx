import {TodoListForm} from "./TodoListForm"
import {EditableSpan} from "./EditableSpan"
import Delete from "@mui/icons-material/Delete"
import React, {useEffect} from "react";
import {Task} from './Task'
import {ButtonUI} from "./ButtonUI";
import {useTodo} from "./hooks/useTodo";
import {TaskStatuses} from "../api/TodoLists-api";
import {fetchTasksTC} from "./state/TasksReducer";
import {useAppDispatch, useAppSelector} from "./hooks/Hooks";
import IconButton from "@mui/material/IconButton";
import {TogoDomainType} from "./state/ReduserTodoLists";
import {Navigate} from "react-router-dom";


export type PropsType = {
    todoList: TogoDomainType
    // demo?: boolean
}

export const TodoList = React.memo(({todoList}: PropsType) => {

    const dispatch = useAppDispatch()
    let {tasks,
        addTask, removeTodoHandler,
        changeTodoListTitle, allFilterHandler,
        activeFilterHandler, completedFilterHandler, isAuth} = useTodo(todoList.id)


    useEffect(() => {
        if(!isAuth) {
            return
        }
        dispatch(fetchTasksTC(todoList.id))
    }, [dispatch]);



    if(todoList.filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if(todoList.filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }


    let tasksList: Array<JSX.Element> | JSX.Element = tasks.length > 0 ?
        tasks.map(t => <Task key={t.id} todoId={todoList.id} task={t}/>) : <span>no tasks</span>

    if(!isAuth){
        return <Navigate to={'/login'}/>
    }


    return (
        <div className="todolist">
            <h3><EditableSpan title={todoList.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoHandler} disabled={todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <TodoListForm addText={addTask} disabled={todoList.entityStatus === 'loading'}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonUI onClick={allFilterHandler} name='All' color={'inherit'} variant={todoList.filter === 'all' ? "outlined" : 'text'}/>
                <ButtonUI onClick={activeFilterHandler} name='Active' color={"primary"} variant={todoList.filter === 'active' ? "outlined" : 'text'}/>
                <ButtonUI onClick={completedFilterHandler} name='Completed' color={"secondary"} variant={todoList.filter === 'completed' ? "outlined" : 'text'}/>
            </div>
        </div>
    )
})


{/*<Button onClick={allFilterHandler} name='All'  variant={filter === 'All' ? "outlined" : 'text'}>All</Button>*/}
{/*<Button onClick={activeFilterHandler} name='Active'  variant={filter === 'active' ? "outlined" : 'text'} color="primary">Active</Button>*/}
{/*<Button onClick={completedFilterHandler} name='Completed'  variant={filter === 'completed' ? "outlined" : 'text'} color="secondary">Completed</Button>*/}




// const dispatch = useDispatch()
//
// const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[id])
//
//
// const addText = useCallback((title: string) => {
//     dispatch(addTaskAC(id, title))
// }, [id])
//
// const removeTodoHandler = useCallback(() => {
//     // props.removeTodoList(id)
//     dispatch(removeTodolistAC(id))
// }, [id])
//
// const changeTodoListTitle = useCallback((value: string) => {
//
//     dispatch(changeTodolistTitleAC(id, value))
//     // props.changeTodoTitle(id, value)
// }, [id])
