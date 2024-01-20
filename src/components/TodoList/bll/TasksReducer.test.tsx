import {
  TasksReducer,
  TasksStateType,
  tasksThunks,
} from "components/TodoList/bll/TasksReducer";
import { todoThunks } from "components/TodoList/bll/ReduserTodoLists";
import { TaskPriorities, TaskStatuses } from "common/api";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        priority: TaskPriorities.Later,
        startDate: "",
        deadline: "",
        description: "",
        order: 1,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        priority: TaskPriorities.Later,
        startDate: "",
        deadline: "",
        description: "",
        order: 1,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        priority: TaskPriorities.Later,
        startDate: "",
        deadline: "",
        description: "",
        order: 1,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Coffee",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        priority: TaskPriorities.Later,
        startDate: "",
        deadline: "",
        description: "",
        order: 1,
        addedDate: "",
      },
      {
        id: "2",
        title: "Bread",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        priority: TaskPriorities.Later,
        startDate: "",
        deadline: "",
        description: "",
        order: 1,
        addedDate: "",
      },
      {
        id: "3",
        title: "Meat",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        priority: TaskPriorities.Later,
        startDate: "",
        deadline: "",
        description: "",
        order: 1,
        addedDate: "",
      },
    ],
  };
});

test("correct task should be removed", () => {
  let parameters = { todoId: "todolistId2", taskId: "3" };
  const action = tasksThunks.removeTaskTC.fulfilled(parameters, "", parameters);
  const endState = TasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"][2]).toBeUndefined();
});

test("task should be added", () => {
  let task = {
    id: "1",
    title: "HTML",
    status: TaskStatuses.New,
    todoListId: "todolistId1",
    priority: TaskPriorities.Later,
    startDate: "",
    deadline: "",
    description: "",
    order: 1,
    addedDate: "",
  };
  const action = tasksThunks.addTaskTC.fulfilled(task, "", {
    todoId: task.todoListId,
    title: task.title,
  });
  const endState = TasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(3);
  // expect(endState['todolistId2'].every(t => t.id === '4')).toBeTruthy()
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId1"][0].title).toBe("HTML");
});

test("correct status should be changed", () => {
  let updateModel = {
    todoId: "todolistId2",
    taskId: "3",
    domainModel: { status: TaskStatuses.Completed },
  };
  const action = tasksThunks.updateTaskTC.fulfilled(
    updateModel,
    "requestId",
    updateModel,
  );
  const endState = TasksReducer(startState, action);

  expect(endState["todolistId1"][2].status).toBeFalsy();
  expect(endState["todolistId2"][2].status).toBeTruthy();
});

test("correct title should be changed", () => {
  let updateModel = {
    todoId: "todolistId2",
    taskId: "3",
    domainModel: { title: "cookies" },
  };
  const action = tasksThunks.updateTaskTC.fulfilled(
    updateModel,
    "requestId",
    updateModel,
  );
  const endState = TasksReducer(startState, action);

  expect(endState["todolistId1"][2].title).toBe("React");
  expect(endState["todolistId2"][2].title).toBe("cookies");
});

test("property with todoId should be removed", () => {
  const action = todoThunks.removeTodoTC.fulfilled(
    {
      todolistId: "todolistId2",
    },
    "",
    "",
  );
  const endState = TasksReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});

test("todoLists should be added", () => {
  const action = todoThunks.fetchTodoListsTC.fulfilled(
    {
      todoLists: [
        { id: "1", title: "What to learn", order: 0, addedDate: "" },
        { id: "2", title: "What to buy", order: 0, addedDate: "" },
      ],
    },
    "",
  );
  const endState = TasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});
test("tasks should be set", () => {
  const action = tasksThunks.fetchTasksTC.fulfilled(
    {
      todoId: "todolistId1",
      tasks: startState["todolistId1"],
    },
    "",
    "todolistId1",
  );
  const endState = TasksReducer({ todolistId1: [], todolistId2: [] }, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
test("new array should be added when new todo added", () => {
  const action = todoThunks.addTodoListTC.fulfilled(
    {
      todoList: {
        id: "todolistId3",
        title: "addTodolist",
        order: 0,
        addedDate: "",
      },
    },
    "",
    "",
  );
  const endState = TasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("oh");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
