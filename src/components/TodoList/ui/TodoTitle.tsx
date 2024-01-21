import React, { useCallback } from "react";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {
  changeTodoTitleTC,
  todoThunks,
  TogoDomainType,
} from "components/TodoList/bll/TodoListsReduser";
import { useAppDispatch } from "common/hooks/Hooks";

export type Props = {
  todoList: TogoDomainType;
};
export const TodoTitle = ({ todoList }: Props) => {
  const dispatch = useAppDispatch();

  const removeTodoHandler = useCallback(() => {
    dispatch(todoThunks.removeTodoTC(todoList.id));
  }, [todoList.id]);

  const changeTodoListTitle = useCallback(
    (value: string) => {
      dispatch(changeTodoTitleTC(todoList.id, value));
    },
    [todoList.id],
  );

  return (
    <h3>
      <EditableSpan title={todoList.title} onChange={changeTodoListTitle} />
      <IconButton
        onClick={removeTodoHandler}
        disabled={todoList.entityStatus === "loading"}
        className={"removeTodo"}
      >
        <Delete />
      </IconButton>
    </h3>
  );
};
