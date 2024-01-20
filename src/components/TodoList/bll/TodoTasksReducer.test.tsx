import {
  ReducerTodoLists,
  todoThunks,
  TogoDomainType,
} from "components/TodoList/bll/TodoListsReduser";
import {
  TasksReducer,
  TasksStateType,
} from "components/TodoList/bll/TasksReducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TogoDomainType> = [];

  const action = todoThunks.addTodoListTC.fulfilled(
    {
      todoList: { id: "1", title: "What to learn", order: 0, addedDate: "" },
    },
    "",
    "",
  );

  const endTaskState = TasksReducer(startTasksState, action);
  const endTodoListsState = ReducerTodoLists(startTodoListsState, action);

  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.payload.todoList.id);
  expect(idFromTodoLists).toBe(action.payload.todoList.id);
});
