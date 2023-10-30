type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export   const ReduserUser = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            let newState = {...state}
            newState.age = state.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state,
            childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...state,
            name: action.newName}
        default:
            throw new Error('Error')
    }
}