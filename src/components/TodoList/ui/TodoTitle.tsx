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
  const { id, title, entityStatus } = todoList;

  const removeTodoHandler = useCallback(() => {
    dispatch(todoThunks.removeTodoTC(id));
  }, [id]);

  const changeTodoListTitle = useCallback(
    (value: string) => {
      dispatch(changeTodoTitleTC(id, value));
    },
    [id],
  );

  return (
    <h3>
      <EditableSpan title={title} onChange={changeTodoListTitle} />
      <IconButton
        onClick={removeTodoHandler}
        disabled={entityStatus === "loading"}
        className={"removeTodo"}
      >
        <Delete />
      </IconButton>
    </h3>
  );
};
