import { Dispatch } from "redux";
import { AppActions, RequestStatus } from "App/bll/AppReducer";
import {
  createSlice,
  isFulfilled,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
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
  async (_, thunkAPI) => {
    const res = await TodoListApi.getTodoLists();
    res.forEach((t) => thunkAPI.dispatch(tasksThunks.fetchTasksTC(t.id)));
    return { todoLists: res };
  },
);

const removeTodoTC = createAppAsyncThunk<{ todolistId: string }, string>(
  "todoLists/removeTodoTC",
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(
      TodoListActions.changeEntityStatusAC({ id, entityStatus: "loading" }),
    );
    const res = await TodoListApi.removeTodoList(id);
    if (res.data.resultCode === 0) {
      return { todolistId: id };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const addTodoListTC = createAppAsyncThunk(
  "todoLists/addTodoListTC",
  async (title: string, { rejectWithValue }) => {
    const res = await TodoListApi.createTodoList(title);
    if (res.data.resultCode === 0) {
      return { todoList: res.data.data.item };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const changeTodoTitleTC = createAppAsyncThunk(
  "todoLists/changeTodoTitleTC",
  async (arg: { id: string; title: string }, { dispatch }) => {
    const res = await TodoListApi.updateTodoList(arg.id, arg.title);
    if (res.data.resultCode === 0) {
      dispatch(TodoListActions.changeTodolistTitleAC(arg));
    } else {
      handleAppError(res.data, dispatch);
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
    builder
      .addCase(clearTodosTasks, (state, action) => {
        return action.payload.todoLists;
      })
      .addCase(fetchTodoListsTC.fulfilled, (state, action) => {
        return action.payload.todoLists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(removeTodoTC.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload.todolistId,
        );
        if (index > -1) {
          state.splice(index, 1);
        }
      })
      .addCase(addTodoListTC.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todoList,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addMatcher(
        isRejected(TodoThunks.addTodoListTC),
        (state, action: any) => {
          const todo = state.find((tl) => tl.id === action.meta.arg);
          if (todo) todo.entityStatus = "failed";
        },
      )
      .addMatcher(isFulfilled(TodoThunks.addTodoListTC), (state, action) => {
        const todo = state.find((tl) => tl.id === action.meta.arg);
        if (todo) todo.entityStatus = "idle";
      });
  },
  selectors: {
    getTodoLists: (sliceState) => sliceState,
  },
});

export const ReducerTodoLists = slice.reducer;
export const TodoListActions = slice.actions;
export const TodoThunks = {
  fetchTodoListsTC,
  removeTodoTC,
  addTodoListTC,
  changeTodoTitleTC,
};
export const { getTodoLists } = slice.selectors;

export const _changeTodoTitleTC =
  (id: string, title: string) => async (dispatch: Dispatch) => {
    try {
      const res = await TodoListApi.updateTodoList(id, title);
      if (res.data.resultCode === 0) {
        dispatch(TodoListActions.changeTodolistTitleAC({ id, title }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
    }
  };
