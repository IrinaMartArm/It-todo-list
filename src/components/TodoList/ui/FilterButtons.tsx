import React from "react";
import { ButtonUI } from "components/Elements/ButtonUI";
import {
  FilterValuesType,
  TodoListActions,
  TogoDomainType,
} from "components/TodoList/bll/TodoListsReduser";
import { useAppDispatch } from "common/hooks/Hooks";

export type Props = {
  todoList: TogoDomainType;
};

export const FilterButtons = ({ todoList }: Props) => {
  const dispatch = useAppDispatch();
  const { id, filter } = todoList;
  const filterHandler = (filter: FilterValuesType) => {
    dispatch(TodoListActions.changeTodolistFilterAC({ id, filter }));
  };

  return (
    <div>
      <ButtonUI
        onClick={() => filterHandler("all")}
        name="All"
        color={"inherit"}
        variant={filter === "all" ? "outlined" : "text"}
      />
      <ButtonUI
        onClick={() => filterHandler("active")}
        name="Active"
        color={"primary"}
        variant={filter === "active" ? "outlined" : "text"}
      />
      <ButtonUI
        onClick={() => filterHandler("completed")}
        name="Completed"
        color={"secondary"}
        variant={filter === "completed" ? "outlined" : "text"}
      />
    </div>
  );
};
