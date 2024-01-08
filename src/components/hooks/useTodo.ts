import { useCallback } from "react";
import { addTaskTC } from "../TodoList/TasksReducer";
import {
  changeTodoTitleTC,
  removeTodoTC,
  TodoListActions,
} from "../TodoList/ReduserTodoLists";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { getIsAuth, getTasks } from "../utils/Selectors";

export const useTodo = (id: string) => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(getTasks)[id];

  const isAuth = useAppSelector(getIsAuth);

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(id, title));
    },
    [id],
  );

  const removeTodoHandler = useCallback(() => {
    dispatch(removeTodoTC(id));
  }, [id]);

  const changeTodoListTitle = useCallback(
    (value: string) => {
      dispatch(changeTodoTitleTC(id, value));
      // props.changeTodoTitle(id, value)
    },
    [id],
  );

  const allFilterHandler = useCallback(() => {
    dispatch(TodoListActions.changeTodolistFilterAC({ id, filter: "all" }));
  }, [id]);
  const activeFilterHandler = useCallback(() => {
    dispatch(TodoListActions.changeTodolistFilterAC({ id, filter: "active" }));
  }, [id]);
  const completedFilterHandler = useCallback(() => {
    dispatch(
      TodoListActions.changeTodolistFilterAC({ id, filter: "completed" }),
    );
  }, [id]);

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
