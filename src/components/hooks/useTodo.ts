import { useCallback } from "react";
import { addTaskTC } from "../TodoList/TasksReducer";
import {
  changeTodoTitleTC,
  removeTodoTC,
  TodoListActions,
} from "../TodoList/ReduserTodoLists";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { getIsAuth, getTasks } from "../utils/Selectors";

export const useTodo = (todoId: string) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(getTasks)[todoId];

  const isAuth = useAppSelector(getIsAuth);

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC({ todoId, title }));
    },
    [todoId],
  );

  const removeTodoHandler = useCallback(() => {
    dispatch(removeTodoTC(todoId));
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
