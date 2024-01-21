import { Dispatch } from "redux";
import { AppActions, RequestStatus } from "App/bll/AppReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTodosTasks } from "common/Actions";
import { tasksThunks } from "components/TodoList/bll/TasksReducer";
import {
  createAppAsyncThunk,
  handleAppError,
  handleServerNetworkError,
} from "common/utils";
import { TodoListsTypeOfResponse } from "common/api";
import { TodoListApi } from "common/api/TodoListApi";

export type FilterValuesType = "all" | "completed" | "active";

export type TogoDomainType = TodoListsTypeOfResponse & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

const fetchTodoListsTC = createAppAsyncThunk(
  "todoLists/fetchTodoListsTC",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await TodoListApi.getTodoLists();
      res.forEach((t) => thunkAPI.dispatch(tasksThunks.fetchTasksTC(t.id)));
      thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
      return { todoLists: res };
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

const removeTodoTC = createAppAsyncThunk<{ todolistId: string }, string>(
  "todoLists/removeTodoTC",
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    dispatch(
      TodoListActions.changeEntityStatusAC({ id, entityStatus: "loading" }),
    );
    try {
      const res = await TodoListApi.removeTodoList(id);
      if (res.data.resultCode === 0) {
        return { todolistId: id };
      } else {
        handleAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(
        TodoListActions.changeEntityStatusAC({ id, entityStatus: "idle" }),
      );
      dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    }
  },
);

const addTodoListTC = createAppAsyncThunk(
  "todoLists/addTodoListTC",
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await TodoListApi.createTodoList(title);
      if (res.data.resultCode === 0) {
        return { todoList: res.data.data.item };
      } else {
        handleAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    }
  },
);

const slice = createSlice({
  name: "todoLists",
  initialState: [] as TogoDomainType[],
  reducers: {
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state[index].title = action.payload.title;
      }
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      const todoList = state.find((tl) => tl.id === action.payload.id);
      if (todoList) {
        todoList.filter = action.payload.filter;
      }
    },
    changeEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatus }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTodosTasks, (state, action) => {
      return action.payload.todoLists;
    });
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      return action.payload.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    });
    builder.addCase(removeTodoTC.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId,
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    });
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
      });
    });
  },
  selectors: {
    getTodoLists: (sliceState) => sliceState,
  },
});

export const ReducerTodoLists = slice.reducer;
export const TodoListActions = slice.actions;
export const todoThunks = { fetchTodoListsTC, removeTodoTC, addTodoListTC };
export const { getTodoLists } = slice.selectors;

export const changeTodoTitleTC =
  (id: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await TodoListApi.updateTodoList(id, title);
      if (res.data.resultCode === 0) {
        dispatch(TodoListActions.changeTodolistTitleAC({ id, title }));
        dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
    }
  };
