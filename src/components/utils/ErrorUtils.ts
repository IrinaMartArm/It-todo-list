import {setAppErrorAC, setAppStatusAC} from "../../App/AppReducer";
import {ResponseType} from "../../api/Api";
import {AppDispatch} from "../../App/Store";


export const handleAppError = <D>(res: ResponseType<D>, dispatch: AppDispatch) => {

    if (res.messages.length) {
        dispatch(setAppErrorAC({error: res.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleNetworkError = (err: string, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC({error: err ? err : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

//AxiosError<ResponseType>

