import { AddItemForm } from "components/addItemForm/AddItemForm";
import React from "react";
import { useTodo } from "common/hooks/useTodo";
import { TogoDomainType } from "components/TodoList/bll/TodoListsReduser";
import { Navigate } from "react-router-dom";
import { TodoTitle } from "components/TodoList/ui/TodoTitle";
import { TasksList } from "components/TodoList/ui/TasksList";
import { FilterButtons } from "components/TodoList/ui/FilterButtons";

export type PropsType = {
  todoList: TogoDomainType;
};

export const TodoList = React.memo(({ todoList }: PropsType) => {
  let { addTask, isAuth } = useTodo(todoList.id);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="todolist">
      <TodoTitle todoList={todoList} />
      <AddItemForm
        addText={addTask}
        disabled={todoList.entityStatus === "loading"}
      />
      <TasksList todoList={todoList} />
      <FilterButtons todoList={todoList} />
    </div>
  );
});
