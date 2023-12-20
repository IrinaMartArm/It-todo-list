import {Dispatch} from "redux";
import {setAppStatusAC} from "./AppReducer";
import {AuthApi, Params} from "../../api/TodoLists-api";
import {handleAppError, handleNetworkError} from "../utils/ErrorUtils";


const initState = {
    isAuth: false
}
export const AuthReducer = (state: initStateType = initState, action: AuthActionType): initStateType => {
    switch (action.type) {
        case 'AUTH/AUTH_ME':
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}

export const setAuthAC = (isAuth: boolean) => ({
    type: 'AUTH/AUTH_ME' as const,
    isAuth
})

export const AuthTC = (params: Params) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await AuthApi.authMe(params)
        if(res.data.resultCode === 0){
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAuthAC(true))
        } else {
            handleAppError(res.data, dispatch)
        }
    }
    catch (err) {
        handleNetworkError(err, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await AuthApi.logout()
        if(res.data.resultCode === 0){
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAuthAC(false))
        } else {
            handleAppError(res.data, dispatch)
        }
    }
    catch (err){
        handleNetworkError(err, dispatch)
    }
}

type initStateType = typeof initState
export type AuthActionType = ReturnType<typeof setAuthAC>