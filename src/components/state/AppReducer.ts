import {Dispatch} from "redux";
import {AuthApi, ResponseType} from "../../api/TodoLists-api";
import {setAuthAC} from "./AuthReducer";
import axios from "axios";
import {handleAppError, handleNetworkError} from "../utils/ErrorUtils";


const initialState: InitState = {
    error: null,
    status: 'loading',
    isInitialized: false
}
export const AppReducer = (state: InitState = initialState, action: AppActions) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}


export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)
export const setAppStatusAC = (status: RequestStatus) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setInitialized = (value: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    value
} as const)


export const initialization = () => async (dispatch: Dispatch) => {
    try {
        const res = await AuthApi.me()
                if(res.data.resultCode === 0){
                    dispatch(setAuthAC(true))
                    dispatch(setInitialized(true))
                } else {
                    handleAppError(res.data, dispatch)
                }
    }
    catch (err){
        if(axios.isAxiosError<ResponseType>(err)){
            const error = err.response?.data ? err.response?.data.messages[0] : err.message
            handleNetworkError(error, dispatch)
        } else {
            handleNetworkError((err as Error).message, dispatch)
        }
    }
}



export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitState = {
    error: string | null
    status: RequestStatus
    isInitialized: boolean
}

export type AppActions = ReturnType<typeof setAppErrorAC> |
                    ReturnType<typeof setAppStatusAC> | ReturnType<typeof setInitialized>
