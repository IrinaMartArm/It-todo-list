import {Provider} from "react-redux";
import {v1} from "uuid";
import {ReducerTodoLists, tdlId1, tdlId2} from "../components/state/ReduserTodoLists";
import {combineReducers, legacy_createStore} from "redux";
import {TasksReducer} from "../components/state/TasksReducer";
import {RootReducerType} from "../components/state/Store";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: ReducerTodoLists
})

const initialState = {
    todoLists: [
        {id: tdlId1, title: 'What to learn', filter: 'All'},
        {id: tdlId2, title: 'What to buy', filter: 'All'}
    ],
    tasks: {
        [tdlId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [tdlId2]: [
            {id: v1(), title: 'Coffee', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ],
}
}

export const storyBookStore = legacy_createStore(rootReducer, initialState as RootReducerType)
export const Decorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}