import { RootReducerType } from "App/Store";
import { createSlice } from "@reduxjs/toolkit";
import { TodoListActions, todoThunks } from "./ReduserTodoLists";
import { AppActions } from "App/AppReducer";
import { clearTodosTasks } from "common/Actions";
import {
  createAppAsyncThunk,
  handleAppError,
  handleServerNetworkError,
  thunkTryCatch,
} from "common/utils";
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
    return thunkTryCatch(thunkAPI, async () => {
      const res = await TodoListApi.getTasks(todoId);
      return { todoId, tasks: res };
    });
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
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    thunkAPI.dispatch(
      TodoListActions.changeEntityStatusAC({
        id: param.todoId,
        entityStatus: "loading",
      }),
    );
    try {
      await TodoListApi.removeTask(param.todoId, param.taskId);
      return { todoId: param.todoId, taskId: param.taskId };
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    } finally {
      thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
      thunkAPI.dispatch(
        TodoListActions.changeEntityStatusAC({
          id: param.todoId,
          entityStatus: "succeeded",
        }),
      );
    }
  },
);

const addTaskTC = createAppAsyncThunk<any, { todoId: string; title: string }>(
  "Tasks/addTaskTC",
  async (arg: AddTaskArg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await TodoListApi.createTask(arg);
      if (res.resultCode === 0) {
        return res.data.item;
      } else {
        handleAppError(res, dispatch);
        return rejectWithValue(null);
      }
    });
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
    return thunkTryCatch(thunkAPI, async () => {
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

      const res = await TodoListApi.updateTask(
        arg.todoId,
        arg.taskId,
        apiModel,
      );
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
    });
  },
);

const slice = createSlice({
  name: "Tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(todoThunks.addTodoListTC.fulfilled, (state, action) => {
      state[action.payload.todoList.id] = [];
    });
    builder.addCase(todoThunks.removeTodoTC.fulfilled, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(todoThunks.fetchTodoListsTC.fulfilled, (state, action) => {
      action.payload.todoLists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(clearTodosTasks, (state, action) => {
      return action.payload.tasks;
    });
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoId] = action.payload.tasks;
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const task = state[action.payload.todoId].findIndex(
        (t) => t.id === action.payload.taskId,
      );
      if (task > -1) {
        state[action.payload.todoId].splice(task, 1);
      }
    });
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      if (action.payload)
        state[action.payload.todoListId].unshift(action.payload);
    });
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoId];
      const task = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (task > -1) {
        tasks[task] = { ...tasks[task], ...action.payload.domainModel };
      }
    });
  },
});

export const TasksReducer = slice.reducer;
export const tasksThunks = {
  updateTaskTC,
  addTaskTC,
  fetchTasksTC,
  removeTaskTC,
};

export type UpdateDomainModelType = Partial<UpdateApiModelType>;
