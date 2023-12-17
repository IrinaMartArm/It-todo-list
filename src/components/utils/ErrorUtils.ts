import {setAppErrorAC, setAppStatusAC} from "../state/AppReducer";
import {useAppDispatch} from "../hooks/Hooks";
import {ResponseType} from "../../api/TodoLists-api";
import {AppDispatch} from "../state/Store";


export const handleAppError = <D>(res: ResponseType<D>, dispatch: AppDispatch) => {

    if (res.messages.length) {
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkError = (err: any, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
