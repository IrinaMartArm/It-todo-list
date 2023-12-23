import {useCallback} from "react";
import {addTodoListTC} from "../TodoList/ReduserTodoLists";
import {useAppDispatch, useAppSelector} from "./Hooks";


export const useApp = () => {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return {todoLists, addTodoList}
}