import {useCallback} from "react";
import {addTaskTC} from "../TodoList/TasksReducer";
import {
    changeTodolistFilterAC,
    changeTodoTitleTC,
    removeTodoTC
} from "../TodoList/ReduserTodoLists";
import {useAppDispatch, useAppSelector} from "./Hooks";


export const useTodo = (id: string) => {

    const dispatch = useAppDispatch()

    const tasks = useAppSelector(state => state.tasks[id])
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(id, title))
    }, [id])

    const removeTodoHandler = useCallback(() => {
        dispatch(removeTodoTC(id))
    }, [id])

    const changeTodoListTitle = useCallback((value: string) => {
        dispatch(changeTodoTitleTC(id, value))
        // props.changeTodoTitle(id, value)
    }, [id])

    const allFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC({id, filter: 'all'}))}, [id])
    const activeFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC({id, filter: "active"}))}, [id])
    const completedFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC({id, filter: "completed"}))}, [id])


    return {tasks, addTask, removeTodoHandler, changeTodoListTitle, allFilterHandler, activeFilterHandler, completedFilterHandler, isAuth}
}