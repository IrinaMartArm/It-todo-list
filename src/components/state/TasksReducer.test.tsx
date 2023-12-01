import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, TasksReducer, TasksStateType} from "./TasksReducer";
import {removeTodolistAC} from "./ReduserTodoLists";
import {TaskPriorities, TaskStatuses} from "../../api/TodoLists-api";


let startState: TasksStateType

beforeEach(() => {
     startState = {
        'todolistId1': [
            {id: '1',
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
        ],
        'todolistId2': [
            {id: '1', title: 'Coffee', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
            {id: '2', title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
            {id: '3', title: 'Meat', status: TaskStatuses.New, todoListId: 'todolistId2',
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                description: '',
                order: 1,
                addedDate: ''},
        ],
    }
})

test('correct tasklist should be removed', () => {

    const action = removeTaskAC('todolistId2', '1')
    const endState = TasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    // expect(endState['todolistId2'].every(t => t.id !== '1')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('2')
})

test('correct todolist should be removed', () => {

    const action = addTaskAC('todolistId2', 'Redux')
    const endState = TasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    // expect(endState['todolistId2'].every(t => t.id === '4')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('Redux')
})

test('correct status should be changed', () => {

    const action = changeStatusAC('todolistId2', '3', 2)
    const endState = TasksReducer(startState, action)

    expect(endState['todolistId1'][2].status).toBeFalsy()
    expect(endState['todolistId2'][2].status).toBeTruthy()
})


test('correct title should be changed', () => {

    const action = changeTitleAC('todolistId2','3','cookies')
    const endState = TasksReducer(startState, action)

    expect(endState['todolistId1'][2].title).toBe('React')
    expect(endState['todolistId2'][2].title).toBe('cookies')
})

// test('new property with new array should be added when new todolist is added', () => {
//
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'HTML', isDone: true},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'React', isDone: false},
//         ],
//         'todolistId2': [
//             {id: '1', title: 'Coffee', isDone: true},
//             {id: '2', title: 'Bread', isDone: true},
//             {id: '3', title: 'Meat', isDone: false},
//         ],
//     }
//
//     const action = addTodolistAC('some')
//     const endState = TasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && 'todolistId2')
//     if(!newKey) {throw Error('key not found')}
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })

test('property with todoId should be removed', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = TasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})