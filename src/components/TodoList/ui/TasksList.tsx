import React from "react";
import { Task } from "components/TodoList/ui/Task";
import { useAppSelector } from "common/hooks/Hooks";
import { getTasks } from "components/TodoList/bll/TasksReducer";
import { TaskStatuses } from "common/api";
import { TogoDomainType } from "components/TodoList/bll/TodoListsReduser";

export type Props = {
  todoList: TogoDomainType;
};

export const TasksList = ({ todoList }: Props) => {
  let tasks = useAppSelector(getTasks)[todoList.id];

  if (todoList.filter === "completed") {
    tasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (todoList.filter === "active") {
    tasks = tasks.filter((t) => t.status === TaskStatuses.New);
  }

  let tasksList: Array<JSX.Element> | JSX.Element =
    tasks.length > 0 ? (
      tasks.map((t) => <Task key={t.id} todoId={todoList.id} task={t} />)
    ) : (
      <span>no tasks</span>
    );

  return <ul>{tasksList}</ul>;
};
