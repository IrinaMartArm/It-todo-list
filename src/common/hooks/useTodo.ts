import { useCallback } from "react";
import {
  changeTodoTitleTC,
  TodoListActions,
  todoThunks,
} from "components/TodoList/ReduserTodoLists";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { getIsAuth, getTasks } from "common/utils/Selectors";
import { tasksThunks } from "components/TodoList/TasksReducer";

export const useTodo = (todoId: string) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(getTasks)[todoId];

  const isAuth = useAppSelector(getIsAuth);

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTaskTC({ todoId, title }));
    },
    [todoId],
  );

  const removeTodoHandler = useCallback(() => {
    dispatch(todoThunks.removeTodoTC(todoId));
  }, [todoId]);

  const changeTodoListTitle = useCallback(
    (value: string) => {
      dispatch(changeTodoTitleTC(todoId, value));
      // props.changeTodoTitle(id, value)
    },
    [todoId],
  );

  const allFilterHandler = useCallback(() => {
    dispatch(TodoListActions.changeTodolistFilterAC({ todoId, filter: "all" }));
  }, [todoId]);
  const activeFilterHandler = useCallback(() => {
    dispatch(
      TodoListActions.changeTodolistFilterAC({ todoId, filter: "active" }),
    );
  }, [todoId]);
  const completedFilterHandler = useCallback(() => {
    dispatch(
      TodoListActions.changeTodolistFilterAC({ todoId, filter: "completed" }),
    );
  }, [todoId]);

  return {
    tasks,
    addTask,
    removeTodoHandler,
    changeTodoListTitle,
    allFilterHandler,
    activeFilterHandler,
    completedFilterHandler,
    isAuth,
  };
};