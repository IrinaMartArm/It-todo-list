import {TasksStateType, TodoListType} from "../../App";
import {addTodolistAC, ReducerTodoLists} from "./ReduserTodoLists";
import {TasksReducer} from "./TasksReducer";

test('ids should be equals', () => {

    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodolistAC('new TodoList')

    const endTaskState = TasksReducer(startTasksState, action)
    const endTodoListsState = ReducerTodoLists(startTodoListsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoId)
    expect(idFromTodoLists).toBe(action.todoId)
})