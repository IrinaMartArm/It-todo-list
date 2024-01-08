import {
  ResponseType,
  TaskPriorities,
  TaskStatuses,
  TaskTypeOfResponse,
  Api,
  UpdateApiModelType,
} from "../../api/Api";
import { Dispatch } from "redux";
import { AppDispatch, RootReducerType } from "../../App/Store";
import { handleAppError, handleNetworkError } from "../utils/ErrorUtils";
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListActions } from "./ReduserTodoLists";
import { AppActions } from "../../App/AppReducer";
import { clearTodosTasks } from "../../common/Actions";

export type TasksStateType = {
  [key: string]: Array<TaskTypeOfResponse>;
};

export const fetchTasksTC = createAsyncThunk(
  "Tasks/fetchTasksTC",
  async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    const res = await Api.getTasks(todoId);
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    return { todoId, tasks: res };
  },
);

export const removeTaskTC = createAsyncThunk(
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
    await Api.removeTask(param.todoId, param.taskId);
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
    thunkAPI.dispatch(
      TodoListActions.changeEntityStatusAC({
        id: param.todoId,
        entityStatus: "succeeded",
      }),
    );
    return { todoId: param.todoId, taskId: param.taskId };
  },
);

export const addTaskTC = createAsyncThunk(
  "Tasks/addTaskTC",
  async (
    arg: { todoId: string; title: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await Api.createTask(arg.todoId, arg.title);
      if (res.resultCode === 0) {
        dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
        return res.data.item;
      } else {
        handleAppError(res, dispatch);
        return rejectWithValue(null);
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
  },
);

export const updateTaskTC = createAsyncThunk(
  "Tasks/updateTaskTC",
  async (
    arg: { todoId: string; taskId: string; domainModel: UpdateDomainModelType },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    const state = thunkAPI.getState() as RootReducerType;
    const task = state.tasks[arg.todoId].find((t) => t.id === arg.taskId);
    if (!task) {
      return thunkAPI.rejectWithValue("error");
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
    try {
      const res = await Api.updateTask(arg.todoId, arg.taskId, apiModel);
      if (res.data.resultCode === 0) {
        // thunkAPI.dispatch(updateTaskAC({ arg.todoId, arg.taskId, model: arg.domainModel }));
        thunkAPI.dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
        return {
          todoId: arg.todoId,
          taskId: arg.taskId,
          model: arg.domainModel,
        };
      } else {
        handleAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue("error");
      }
    } catch (err) {
      if (axios.isAxiosError<ResponseType>(err)) {
        const error = err.response?.data
          ? err.response?.data.messages[0]
          : err.message;
        handleNetworkError(error, thunkAPI.dispatch);
      } else {
        handleNetworkError((err as Error).message, thunkAPI.dispatch);
      }
    }
  },
);

const slice = createSlice({
  name: "Tasks",
  initialState: {} as TasksStateType,
  reducers: {
    updateTaskAC(
      state,
      action: PayloadAction<{
        todoId: string;
        taskId: string;
        model: UpdateDomainModelType;
      }>,
    ) {
      const tasks = state[action.payload.todoId];
      const task = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (task > -1) {
        tasks[task] = { ...tasks[task], ...action.payload.model };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(TodoListActions.addTodolistAC, (state, action) => {
      state[action.payload.todoList.id] = [];
    });
    builder.addCase(TodoListActions.removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(TodoListActions.setTodoAC, (state, action) => {
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
  },
});

export const TasksReducer = slice.reducer;
export const { updateTaskAC } = slice.actions;

// export const _fetchTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
//   dispatch(AppActions.setAppStatusAC({ status: "loading" }));
//   try {
//     const res = await Api.getTasks(todoId);
//     dispatch(setTasksAC({ todoId, tasks: res }));
//     dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
//   } catch (err) {
//     if (axios.isAxiosError<ResponseType>(err)) {
//       const error = err.response?.data
//         ? err.response?.data.messages[0]
//         : err.message;
//       handleNetworkError(error, dispatch);
//     } else {
//       handleNetworkError((err as Error).message, dispatch);
//     }
//   }
// };

// export const _removeTaskTC =
//   (todoId: string, taskId: string) => async (dispatch: AppDispatch) => {
//     dispatch(AppActions.setAppStatusAC({ status: "loading" }));
//     dispatch(
//       TodoListActions.changeEntityStatusAC({
//         id: todoId,
//         entityStatus: "loading",
//       }),
//     );
//     try {
//       const res = await Api.removeTask(todoId, taskId);
//       if (res.data.resultCode === 0) {
//         dispatch(removeTaskAC({ todoId, taskId }));
//         dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
//       } else {
//         handleAppError(res.data, dispatch);
//       }
//     } catch (err) {
//       if (axios.isAxiosError<ResponseType>(err)) {
//         const error = err.response?.data
//           ? err.response?.data.messages[0]
//           : err.message;
//         handleNetworkError(error, dispatch);
//       } else {
//         handleNetworkError((err as Error).message, dispatch);
//       }
//       dispatch(
//         TodoListActions.changeEntityStatusAC({
//           id: todoId,
//           entityStatus: "idle",
//         }),
//       );
//     } finally {
//       dispatch(AppActions.setAppStatusAC({ status: "idle" }));
//       dispatch(
//         TodoListActions.changeEntityStatusAC({
//           id: todoId,
//           entityStatus: "idle",
//         }),
//       );
//     }
//   };

// export const addTaskTC_ =
//   (todoId: string, title: string) => async (dispatch: AppDispatch) => {
//     dispatch(AppActions.setAppStatusAC({ status: "loading" }));
//     try {
//       const res = await Api.createTask(todoId, title);
//       if (res.resultCode === 0) {
//         dispatch(addTaskAC(res.data.item));
//         dispatch(AppActions.setAppStatusAC({ status: "succeeded" }));
//       } else {
//         handleAppError(res, dispatch);
//       }
//     } catch (err) {
//       if (axios.isAxiosError<ResponseType>(err)) {
//         const error = err.response?.data
//           ? err.response?.data.messages[0]
//           : err.message;
//         handleNetworkError(error, dispatch);
//       } else {
//         handleNetworkError((err as Error).message, dispatch);
//       }
//     }
//   };

export type UpdateDomainModelType = {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export const updateTaskTC_ =
  (todoId: string, taskId: string, domainModel: UpdateDomainModelType) =>
  async (dispatch: Dispatch, getState: () => RootReducerType) => {
    dispatch(AppActions.setAppStatusAC({ status: "loading" }));
    let state = getState();
    const task = state.tasks[todoId].find((t) => t.id === taskId);
    if (!task) {
      console.log("error");
      return;
    }
    const apiModel: UpdateApiModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    };
    try {
      const res = await Api.updateTask(todoId, taskId, apiModel);
      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC({ todoId, taskId, model: domainModel }));
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

// export const TasksReducer = (state: TasksStateType = initState, action: TasksActionsType): TasksStateType => {
//     switch (action.type) {
//         case REMOVETASK : {
//             return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
//         }
//         case ADDTASK : {
//             return {
//                 ...state,
//                 [action.payload.task.todoListId]:
//                     [action.payload.task , ...state[action.payload.task.todoListId]]
//             }
//         }
//         case UPDATETASK : {
//             return {...state,
//                 [action.payload.todoId]:  state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)}
//         }
//         case ADDTODOLIST : {
//             return {...state, [action.todoList.id]: []}
//         }
//         case 'REMOVE-TODOLIST' : {
//             // const newState = {...state}
//             // delete newState[action.id]
//             // return newState
//             const {[action.id]: [], ...rest} = state
//             return rest
//         }
//         case 'SETTODO': {
//             const stateCopy = {...state}
//             action.todoLists.forEach((tl) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy;
//         }
//         case 'SET-TASKS': {
//             return {...state, [action.todoId]: action.tasks}
//         }
//         default:
//             return state
//     }
// }

// export const removeTaskAC = (todoId: string, taskId: string) => {
//     return {
//         type: REMOVETASK,
//         todoId: todoId,
//         taskId: taskId
//         // payload: {todoId, taskId}
//     } as const
// }
// export const addTaskAC = (task: TaskTypeOfResponse) => {
//     return {
//         type: ADDTASK,
//         payload: {task}
//     } as const
// }
// export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainModelType) => {
//     return {
//         type: UPDATETASK,
//         payload: {todoId, taskId, model}
//     } as const
// }
//
// export const setTasksAC = (todoId: string, tasks: Array<TaskTypeOfResponse>) => {
//     return {type: 'SET-TASKS', todoId, tasks} as const
// }

//
// const REMOVETASK = 'REMOVE-TASK'
// const ADDTASK = 'ADD-TASK'
// const UPDATETASK = 'UPDATE-TASK'
// const ADDTODOLIST = "ADD-TODOLIST"
//
// type RemoveTaskType = ReturnType<typeof removeTaskAC>
// type AddTaskType = ReturnType<typeof addTaskAC>
// type UpdateTaskACType = ReturnType<typeof updateTaskAC>
// type setTasksType = ReturnType<typeof setTasksAC>
//
//
// export type TasksActionsType = RemoveTaskType | AddTaskType | UpdateTaskACType | AddTodoListActionType | RemoveTodoListActionType | setTasksType | setTodoActionType
//
