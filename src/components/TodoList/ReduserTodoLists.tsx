import { Api, ResponseType, TodoListsTypeOfResponse } from "../../api/Api";
import { Dispatch } from "redux";
import { AppActions, RequestStatus } from "../../App/AppReducer";
import { handleAppError, handleNetworkError } from "../utils/ErrorUtils";
import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasksTC } from "./TasksReducer";
import { AppDispatch } from "../../App/Store";
import { clearTodosTasks } from "../../common/Actions";
import { action } from "@storybook/addon-actions";

export type FilterValuesType = "all" | "completed" | "active";

export type TogoDomainType = TodoListsTypeOfResponse & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

const initialState: TogoDomainType[] = [];

const slice = createSlice({
  name: "TodoLists",
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId,
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(
      state,
      action: PayloadAction<{ todoList: TodoListsTypeOfResponse }>,
    ) {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
      });
    },
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
    setTodoAC(
      state,
      action: PayloadAction<{ todoLists: TodoListsTypeOfResponse[] }>,
    ) {
      return action.payload.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    },
    changeEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatus }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        console.log(action.payload.entityStatus);
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTodosTasks, (state, action) => {
      return action.payload.todoLists;
    });
  },
});
export const ReducerTodoLists = slice.reducer;
export const TodoListActions = slice.actions;

export const fetchTodoListsTC = () => async (dispatch: AppDispatch) => {
  // dispatch(setAppStatusAC('loading'))
  try {
    const res = await Api.getTodoLists();
    dispatch(TodoListActions.setTodoAC({ todoLists: res }));

    res.forEach((t) => dispatch(fetchTasksTC(t.id)));
    dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
  } catch (err) {
    if (axios.isAxiosError<ResponseType>(err)) {
      const error = err.response?.data
        ? err.response?.data.messages[0]
        : err.message;
      handleNetworkError(error, dispatch);
    } else {
      handleNetworkError((err as Error).message, dispatch);
    }
  }
};

export const removeTodoTC = (id: string) => async (dispatch: Dispatch) => {
  dispatch(AppActions.setAppStatusAC({ status: "loading" }));
  dispatch(
    TodoListActions.changeEntityStatusAC({ id, entityStatus: "loading" }),
  );
  try {
    const res = await Api.removeTodoList(id);
    if (res.data.resultCode === 0) {
      dispatch(TodoListActions.removeTodolistAC({ todolistId: id }));
      dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    } else {
      handleAppError(res.data, dispatch);
    }
  } catch (err) {
    dispatch(
      TodoListActions.changeEntityStatusAC({ id, entityStatus: "idle" }),
    );
    if (axios.isAxiosError<ResponseType>(err)) {
      const error = err.response?.data
        ? err.response?.data.messages[0]
        : err.message;
      handleNetworkError(error, dispatch);
    } else {
      handleNetworkError((err as Error).message, dispatch);
    }
  }
};

export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
  dispatch(AppActions.setAppStatusAC({ status: "loading" }));
  try {
    const res = await Api.createTodoList(title);
    if (res.data.resultCode === 0) {
      dispatch(TodoListActions.addTodolistAC({ todoList: res.data.data.item }));
      dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    } else {
      handleAppError(res.data, dispatch);
    }
  } catch (err) {
    if (axios.isAxiosError<ResponseType>(err)) {
      const error = err.response?.data
        ? err.response?.data.messages[0]
        : err.message;
      handleNetworkError(error, dispatch);
    } else {
      handleNetworkError((err as Error).message, dispatch);
    }
  }
};

export const changeTodoTitleTC =
  (id: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await Api.updateTodoList(id, title);
      if (res.data.resultCode === 0) {
        dispatch(TodoListActions.changeTodolistTitleAC({ id, title }));
        dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError<ResponseType>(err)) {
        const error = err.response?.data
          ? err.response?.data.messages[0]
          : err.message;
        handleNetworkError(error, dispatch);
      } else {
        handleNetworkError((err as Error).message, dispatch);
      }
    }
  };

// export type RemoveTodoListActionType = {
//     type: 'REMOVE-TODOLIST'
//     id: string
// }
// export type AddTodoListActionType = {
//     type: 'ADD-TODOLIST'
//     todoList: TodoListsTypeOfResponse
// }
// export type ChangeTodoListTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     id: string
//     title: string
// }
// export type setTodoActionType = ReturnType<typeof setTodoAC>
//
// export type TodoListActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType
//     | ReturnType<typeof changeTodolistFilterAC>
//     | setTodoActionType
//     | ReturnType<typeof changeEntityStatusAC>
//

// export const ReducerTodoLists = (state: TogoDomainType[] = initialState , action: TodoListActionsType): TogoDomainType[] => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             {return state.filter(t => t.id !== action.id)}
//         case 'ADD-TODOLIST':
//             return [{...action.todoList, filter: 'all', entityStatus: "idle"}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
//         case 'CHANGE-ENTITY-STATUS':
//             return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
//         case 'SET-TODO':
//             return action.todoLists.map(td => {
//                 return {...td, filter: 'all', entityStatus: "idle"}
//             })
//         default:
//             return state
//     }
// }
//   ActionCreators
// export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId} as const
// }
// export const addTodolistAC = (todoList: TodoListsTypeOfResponse): AddTodoListActionType => {
//     return {type: 'ADD-TODOLIST', todoList} as const
// }
//
// export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
// }
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
// }
// export const setTodoAC = (todoLists: TodoListsTypeOfResponse[]) => {
//     return {type: 'SET-TODO', todoLists} as const
// }
// export const changeEntityStatusAC = (id: string, status: RequestStatus) => {
//     return {type: 'CHANGE-ENTITY-STATUS', id, status} as const
// }
