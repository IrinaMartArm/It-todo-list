import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import {
  getTodoLists,
  todoThunks,
} from "components/TodoList/bll/TodoListsReduser";
import { getIsAuth } from "components/Login/AuthReducer";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(getTodoLists);
  const isAuth = useAppSelector(getIsAuth);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(todoThunks.addTodoListTC(title));
    },
    [dispatch],
  );

  return { todoLists, addTodoList, dispatch, isAuth };
};
