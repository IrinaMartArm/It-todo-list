import { RootReducerType } from "App/Store";
import { createSlice } from "@reduxjs/toolkit";
import {
  TodoListActions,
  TodoThunks,
} from "components/TodoList/bll/TodoListsReduser";
import { clearTodosTasks } from "common/Actions";
import { createAppAsyncThunk, handleAppError } from "common/utils";
import { AddTaskArg, TaskTypeOfResponse, UpdateApiModelType } from "common/api";
import { TodoListApi } from "common/api/TodoListApi";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export type TasksStateType = {
  [key: string]: Array<TaskTypeOfResponse>;
};
export type TasksStateType2 = Record<string, TaskTypeOfResponse[]>;

const fetchTasksTC = createAppAsyncThunk<any, string, BaseThunkAPI<any, any>>(
  "Tasks/fetchTasksTC",
  async (todoId: string, thunkAPI) => {
    const res = await TodoListApi.getTasks(todoId);
    return { todoId, tasks: res };
  },
);

const removeTaskTC = createAppAsyncThunk(
  "Tasks/removeTaskTC",
  async (
    param: {
      todoId: string;
      taskId: string;
    },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(
      TodoListActions.changeEntityStatusAC({
        id: param.todoId,
        entityStatus: "loading",
      }),
    );
    await TodoListApi.removeTask(param.todoId, param.taskId);
    thunkAPI.dispatch(
      TodoListActions.changeEntityStatusAC({
        id: param.todoId,
        entityStatus: "succeeded",
      }),
    );
    return { todoId: param.todoId, taskId: param.taskId };
  },
);

const addTaskTC = createAppAsyncThunk<any, { todoId: string; title: string }>(
  "Tasks/addTaskTC",
  async (arg: AddTaskArg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await TodoListApi.createTask(arg);
    if (res.resultCode === 0) {
      return res.data.item;
    } else {
      handleAppError(res, dispatch);
      return rejectWithValue(res.data);
    }
  },
);

const updateTaskTC = createAppAsyncThunk<
  any,
  { todoId: string; taskId: string; domainModel: UpdateDomainModelType },
  BaseThunkAPI<any, any>
>(
  "Tasks/updateTaskTC",
  async (
    arg: { todoId: string; taskId: string; domainModel: UpdateDomainModelType },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootReducerType;
    const task = state.tasks[arg.todoId].find((t) => t.id === arg.taskId);
    if (!task) {
      return thunkAPI.rejectWithValue(null);
    }
    const apiModel: UpdateApiModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...arg.domainModel,
    };

    const res = await TodoListApi.updateTask(arg.todoId, arg.taskId, apiModel);
    if (res.data.resultCode === 0) {
      return {
        todoId: arg.todoId,
        taskId: arg.taskId,
        domainModel: arg.domainModel,
      };
    } else {
      handleAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TodoThunks.addTodoListTC.fulfilled, (state, action) => {
        state[action.payload.todoList.id] = [];
      })
      .addCase(TodoThunks.removeTodoTC.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(TodoThunks.fetchTodoListsTC.fulfilled, (state, action) => {
        action.payload.todoLists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTodosTasks, (state, action) => {
        return action.payload.tasks;
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const task = state[action.payload.todoId].findIndex(
          (t) => t.id === action.payload.taskId,
        );
        if (task > -1) {
          state[action.payload.todoId].splice(task, 1);
        }
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        if (action.payload)
          state[action.payload.todoListId].unshift(action.payload);
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoId];
        const task = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (task > -1) {
          tasks[task] = { ...tasks[task], ...action.payload.domainModel };
        }
      });
  },
  selectors: {
    getTasks: (sliceState) => sliceState,
  },
});

export const TasksReducer = slice.reducer;
export const { getTasks } = slice.selectors;
export const tasksThunks = {
  updateTaskTC,
  addTaskTC,
  fetchTasksTC,
  removeTaskTC,
};

export type UpdateDomainModelType = Partial<UpdateApiModelType>;
