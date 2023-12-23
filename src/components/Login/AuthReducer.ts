import {Dispatch} from "redux";
import {AuthApi, Params, ResponseType} from "../../api/TodoLists-api";
import {handleAppError, handleNetworkError} from "../utils/ErrorUtils";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../App/AppReducer";


const initState = {
    isAuth: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setAuthAC(state, action: PayloadAction<{isAuth: boolean }>){
            state.isAuth = action.payload.isAuth
        }
    }
})

export const AuthReducer = slice.reducer
export const setAuthAC = slice.actions.setAuthAC

export const AuthTC = (params: Params) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        let res = await AuthApi.authMe(params)
        if(res.data.resultCode === 0){
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setAuthAC({isAuth: true}))
        } else {
            handleAppError(res.data, dispatch)
        }
    }
    catch (err) {
        if(axios.isAxiosError<ResponseType>(err)){
            const error = err.response?.data ? err.response?.data.messages[0] : err.message
            handleNetworkError(error, dispatch)
        } else {
            handleNetworkError((err as Error).message, dispatch)
        }
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        let res = await AuthApi.logout()
        if(res.data.resultCode === 0){
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setAuthAC({isAuth: false}))
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

// type initStateType = typeof initState
// export type AuthActionType = ReturnType<typeof setAuthAC>

//     (state: initStateType = initState, action: AuthActionType): initStateType => {
//     switch (action.type) {
//         case 'AUTH/AUTH_ME':
//             return {...state, isAuth: action.isAuth}
//         default:
//             return state
//     }
// }

// export const setAuthAC = (isAuth: boolean) => ({
//     type: 'AUTH/AUTH_ME' as const,
//     isAuth
// })
