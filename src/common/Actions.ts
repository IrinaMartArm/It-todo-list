import { createAction } from "@reduxjs/toolkit";
import { TasksStateType } from "components/TodoList/bll/TasksReducer";
import { TogoDomainType } from "components/TodoList/bll/ReduserTodoLists";

type ClearTodosTasks = {
  tasks: TasksStateType;
  todoLists: TogoDomainType[];
};

export const clearTodosTasks =
  createAction<ClearTodosTasks>("clearTodos-Tasks");

// export const clearTodosTasks =
//   createAction("clearTodos-Tasks", prepareActions(tasks: TasksStateType, todoLists: TogoDomainType[]) => {
//      return {
//          payload: {
//              tasks,
//              todoLists
//      }}
//   });
