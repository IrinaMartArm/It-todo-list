import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./components/state/Store";
import {useCallback} from "react";
import {addTodolistAC, TogoDomainType} from "./components/state/ReduserTodoLists";


export const useApp = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<RootReducerType, Array<TogoDomainType>>(state => state.todoLists)


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return {todoLists, addTodoList}
}