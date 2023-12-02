import {TodoListForm} from "./TodoListForm"
import {EditableSpan} from "./EditableSpan"
import {IconButton} from "@material-ui/core"
import {Delete} from "@mui/icons-material"
import React, {useEffect} from "react";
import {Task} from './Task'
import {ButtonUI} from "./ButtonUI";
import {useTodo} from "./useTodo";
import {TaskStatuses} from "../api/TodoLists-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/TasksReducer";

export type PropsType = {
    id: string
    filter: string
    title: string
}

export const TodoListRedux = React.memo((props: PropsType) => {
    console.log('TodoList')

    const {id, filter, title} = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [id]);

    let {tasks,
        addText, removeTodoHandler,
        changeTodoListTitle, allFilterHandler,
        activeFilterHandler, completedFilterHandler} = useTodo(id)


    if(filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if(filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }


    let tasksList: Array<JSX.Element> | JSX.Element = tasks.length > 0 ?
        tasks.map(t => <Task key={t.id} todoId={id} task={t}/>) : <span>no tasks</span>


    return (
        <div className="todolist">
            <h3><EditableSpan title={title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <TodoListForm addText={addText}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonUI onClick={allFilterHandler} name='All' color={'inherit'} variant={filter === 'All' ? "outlined" : 'text'}/>
                <ButtonUI onClick={activeFilterHandler} name='Active' color={"primary"} variant={filter === 'active' ? "outlined" : 'text'}/>
                <ButtonUI onClick={completedFilterHandler} name='Completed' color={"secondary"} variant={filter === 'completed' ? "outlined" : 'text'}/>
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
