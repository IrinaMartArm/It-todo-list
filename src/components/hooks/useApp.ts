import { useCallback } from "react";
import { addTodoListTC } from "../TodoList/ReduserTodoLists";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { getTodoLists } from "../utils/Selectors";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(getTodoLists);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodoListTC(title));
    },
    [dispatch],
  );

  return { todoLists, addTodoList };
};
