


const initialState: InitState = {
    error: null,
    status: 'idle'
}
export const AppReducer = (state: InitState = initialState, action: AppActions) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
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





export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitState = {
    error: string | null
    status: RequestStatus
}
export type AppActions = ReturnType<typeof setAppErrorAC> |
                    ReturnType<typeof setAppStatusAC>
