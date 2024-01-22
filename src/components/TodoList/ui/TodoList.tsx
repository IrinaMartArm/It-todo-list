import { AddItemForm } from "components/addItemForm/AddItemForm";
import React, { useCallback } from "react";
import { TogoDomainType } from "components/TodoList/bll/TodoListsReduser";
import { TodoTitle } from "components/TodoList/ui/TodoTitle";
import { TasksList } from "components/TodoList/ui/TasksList";
import { FilterButtons } from "components/TodoList/ui/FilterButtons";
import { tasksThunks } from "components/TodoList/bll/TasksReducer";
import { useAppDispatch } from "common/hooks/Hooks";

export type Props = {
  todoList: TogoDomainType;
};

export const TodoList = React.memo(({ todoList }: Props) => {
  const dispatch = useAppDispatch();

  const addTask = useCallback(
    (title: string) => {
      return dispatch(
        tasksThunks.addTaskTC({ todoId: todoList.id, title }),
      ).unwrap();
    },
    [todoList.id],
  );

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
