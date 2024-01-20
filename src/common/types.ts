import { TaskPriorities, TaskStatuses } from "common/api";

export type TodoListsTypeOfResponse = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  fieldErrors?: Array<{ field: string; error: string }>;
  data: D;
};

export type TaskTypeOfResponse = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateApiModelType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type TaskResponseType = {
  totalCount: string | null;
  error: string | null;
  items: Array<TaskTypeOfResponse>;
};

export type Params = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type AddTaskArg = {
  todoId: string;
  title: string;
};
