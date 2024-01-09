import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { getTodoLists } from "../utils/Selectors";
import { todoThunks } from "components/TodoList/ReduserTodoLists";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(getTodoLists);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(todoThunks.addTodoListTC(title));
    },
    [dispatch],
  );

  return { todoLists, addTodoList };
};
