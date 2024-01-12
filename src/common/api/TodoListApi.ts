import { AxiosResponse } from "axios";
import {
  AddTaskArg,
  TaskTypeOfResponse,
  TodoListsTypeOfResponse,
  UpdateApiModelType,
  ResponseType,
  TaskResponseType,
} from "common/api/types";
import { instance } from "common/api/instance";

export const TodoListApi = {
  async getTodoLists() {
    let resp = await instance.get<Array<TodoListsTypeOfResponse>>("todo-lists");
    return resp.data;
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListsTypeOfResponse }>>(
      "todo-lists",
      { title },
    );
  },
  removeTodoList(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodoList(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title });
  },
  async getTasks(todoId: string) {
    let resp = await instance.get<TaskResponseType>(
      `todo-lists/${todoId}/tasks`,
    );
    return resp.data.items;
  },
  removeTask(todoId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todoId}/tasks/${taskId}`,
    );
  },
  async createTask(arg: AddTaskArg) {
    const resp = await instance.post<
      ResponseType<{ item: TaskTypeOfResponse }>,
      AxiosResponse<ResponseType<{ item: TaskTypeOfResponse }>>,
      { title: string }
    >(`todo-lists/${arg.todoId}/tasks`, { title: arg.title });
    return resp.data;
  },
  updateTask(todoId: string, taskId: string, model: UpdateApiModelType) {
    return instance.put<ResponseType>(
      `todo-lists/${todoId}/tasks/${taskId}`,
      model,
    );
  },
};
