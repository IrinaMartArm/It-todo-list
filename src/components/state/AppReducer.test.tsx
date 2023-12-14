import {AppReducer, InitState, setErrorAC, setStatusAC} from "./AppReducer";


let startState: InitState
beforeEach(() => {
    startState = {
        error: 'some error',
        status: 'idle'
    }
})
test('correct error should be set', () => {

    const endState = AppReducer(startState, setErrorAC('error'))

    expect(endState.error).toBe('error')
})
test('correct status should be set', () => {

    const endState = AppReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')
})
