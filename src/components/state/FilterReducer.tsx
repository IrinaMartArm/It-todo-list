import {TaskType} from "../TodoList";
import {FilterValuesType} from "../App3";

export const FilterReducer = (state: FilterValuesType, action: ChangeFilterType): FilterValuesType => {
    switch (action.type) {
        case 'CHANGE-FILTER' : {
            return action.payload.value
        }
        default: return state
    }
}


type ChangeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value
        }
    }as const
}