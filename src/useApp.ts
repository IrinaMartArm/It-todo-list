import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./components/state/Store";
import {useCallback} from "react";
import {addTodolistAC, addTodoListTC, TogoDomainType} from "./components/state/ReduserTodoLists";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


export const useApp = () => {

    const dispatch: ThunkDispatch<RootReducerType, unknown, AnyAction> = useDispatch()
    const todoLists = useSelector<RootReducerType, Array<TogoDomainType>>(state => state.todoLists)


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return {todoLists, addTodoList}
}