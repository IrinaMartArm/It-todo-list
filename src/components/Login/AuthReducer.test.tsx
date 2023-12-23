import {AuthReducer, setAuthAC} from "./AuthReducer";


let startState: {isAuth: boolean}
beforeEach(() => {
    startState = {
        isAuth: false
    }
})

test('correct status should be set', () => {

    const endState = AuthReducer(startState, setAuthAC({isAuth: true}))

    expect(endState.isAuth).toBe(true)
})
