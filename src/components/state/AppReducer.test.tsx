import {AppReducer, InitState, setAppErrorAC, setAppStatusAC} from "./AppReducer";


let startState: InitState
beforeEach(() => {
    startState = {
        error: 'some error',
        status: 'idle'
    }
})
test('correct error should be set', () => {

    const endState = AppReducer(startState, setAppErrorAC('error'))

    expect(endState.error).toBe('error')
})
test('correct status should be set', () => {

    const endState = AppReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})
