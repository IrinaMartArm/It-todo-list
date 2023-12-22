import {setAppErrorAC, setAppStatusAC} from "../state/AppReducer";
import {ResponseType} from "../../api/TodoLists-api";
import {AppDispatch} from "../state/Store";
import {AxiosError} from "axios";


export const handleAppError = <D>(res: ResponseType<D>, dispatch: AppDispatch) => {

    if (res.messages.length) {
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkError = (err: string, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(err ? err : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

//AxiosError<ResponseType>


export const handleNetworkErrors = () => {

}