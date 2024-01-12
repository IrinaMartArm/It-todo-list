import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { getIsInitialized, getTodoLists } from "common/utils/Selectors";
import { todoThunks } from "components/TodoList/ReduserTodoLists";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(getTodoLists);
  const isInitialized = useAppSelector(getIsInitialized);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(todoThunks.addTodoListTC(title));
    },
    [dispatch],
  );

  return { todoLists, addTodoList, isInitialized, dispatch };
};
