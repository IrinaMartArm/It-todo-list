import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    ReducerTodoLists,
    removeTodolistAC
} from "./ReduserTodoLists";

import { TodoListType} from "../../App";
import {v1} from "uuid";
import {FilterValuesType} from "../App2";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = ReducerTodoLists(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('should add TodoList', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    let newTodoListTitle = 'a'

    const endState = ReducerTodoLists(startState, addTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].filter).toBe('All')
})

test('correct todolist Title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    let newTitle = 'a'

    const action = changeTodolistTitleAC(todolistId2, newTitle)

    const endState = ReducerTodoLists(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})


test('correct todolist filter', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    let newFilter: FilterValuesType = 'active'

    const action  = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = ReducerTodoLists(startState, action)

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})




