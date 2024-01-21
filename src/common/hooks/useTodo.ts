import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { tasksThunks } from "components/TodoList/bll/TasksReducer";
import { getIsAuth } from "components/Login/AuthReducer";

export const useTodo = (todoId: string) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(getIsAuth);

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTaskTC({ todoId, title }));
    },
    [todoId],
  );

  return {
    addTask,
    isAuth,
  };
};
