import {v1} from "uuid";
import {TodoListType} from "../../App";
import { RemoveTodolistAC} from "./ReduserTodoLists";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    // const endState = ReduserTodoLists(startState, RemoveTodolistAC(todolistId1))
    //
    // expect(endState.length).toBe(1)
    // expect(endState[0].id).toBe(todolistId2)
})
