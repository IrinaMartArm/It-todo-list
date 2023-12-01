import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {useCallback} from "react";
import {addTaskAC} from "./state/TasksReducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/ReduserTodoLists";
import {TaskTypeOfResponse} from "../api/TodoLists-api";


export const useTodo = (id: string) => {
    const dispatch = useDispatch()

    const tasks = useSelector<RootReducerType, Array<TaskTypeOfResponse>>(state => state.tasks[id])


    const addText = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [id])

    const removeTodoHandler = useCallback(() => {
        // props.removeTodoList(id)
        dispatch(removeTodolistAC(id))
    }, [id])

    const changeTodoListTitle = useCallback((value: string) => {
        console.log('todo', value)
        dispatch(changeTodolistTitleAC(id, value))
        // props.changeTodoTitle(id, value)
    }, [id])

    const allFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'All'))}, [id])
    const activeFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'active'))}, [id])
    const completedFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'completed'))}, [id])


    return {tasks, addText, removeTodoHandler, changeTodoListTitle, allFilterHandler, activeFilterHandler, completedFilterHandler}
}