import {useSelector} from "react-redux";
import {RootReducerType} from "../state/Store";
import {useCallback} from "react";
import {addTaskTC} from "../state/TasksReducer";
import {
    changeTodolistFilterAC,
    changeTodoTitleTC,
    removeTodoTC
} from "../state/ReduserTodoLists";
import {TaskTypeOfResponse} from "../../api/TodoLists-api";
import {useAppDispatch, useAppSelector} from "./Hooks";


export const useTodo = (id: string) => {

    const dispatch = useAppDispatch()

    const tasks = useAppSelector(state => state.tasks[id])


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

    const allFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'all'))}, [id])
    const activeFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'active'))}, [id])
    const completedFilterHandler = useCallback(() => {dispatch(changeTodolistFilterAC(id, 'completed'))}, [id])


    return {tasks, addTask, removeTodoHandler, changeTodoListTitle, allFilterHandler, activeFilterHandler, completedFilterHandler}
}