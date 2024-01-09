import {
  addTodoListTC,
  fetchTodoListsTC,
  FilterValuesType,
  ReducerTodoLists,
  removeTodoTC,
  TodoListActions,
  TogoDomainType,
} from "./ReduserTodoLists";
import { v1 } from "uuid";
import { RequestStatus } from "App/AppReducer";

let todolistId1 = v1();
let todolistId2 = v1();

let startState: Array<TogoDomainType>;

beforeEach(() => {
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState = ReducerTodoLists(
    startState,
    removeTodoTC.fulfilled({ todolistId: todolistId1 }, "", ""),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("should add TodoList", () => {
  let newTodoList = {
    id: todolistId1,
    title: "What to learn",
    order: 0,
    addedDate: "",
  };

  const endState = ReducerTodoLists(
    startState,
    addTodoListTC.fulfilled({ todoList: newTodoList }, "", ""),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("What to learn");
  expect(endState[0].filter).toBe("all");
});

test("correct todolist Title", () => {
  let newTitle = "a";

  const action = TodoListActions.changeTodolistTitleAC({
    id: todolistId2,
    title: newTitle,
  });

  const endState = ReducerTodoLists(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTitle);
});

test("correct todolist filter", () => {
  let newFilter: FilterValuesType = "active";

  const action = TodoListActions.changeTodolistFilterAC({
    todoId: todolistId2,
    filter: newFilter,
  });

  const endState = ReducerTodoLists(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
test("correct todolist status should be changed", () => {
  let newStatus: RequestStatus = "loading";

  const action = TodoListActions.changeEntityStatusAC({
    id: todolistId1,
    entityStatus: newStatus,
  });

  const endState = ReducerTodoLists(startState, action);

  expect(endState[0].entityStatus).toBe(newStatus);
  expect(endState[1].entityStatus).toBe("idle");
});

test("correct state", () => {
  const action = fetchTodoListsTC.fulfilled({ todoLists: startState }, "");

  const endState = ReducerTodoLists([], action);

  expect(endState.length).toBe(2);
});
