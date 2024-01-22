import { AddItemForm } from "components/addItemForm/AddItemForm";
import { TodoList } from "components/TodoList/ui/TodoList";
import React, { useCallback, useEffect } from "react";
import {
  getTodoLists,
  todoThunks,
} from "components/TodoList/bll/TodoListsReduser";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { getIsAuth } from "components/Login/AuthReducer";

export const TodoListBox = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(getTodoLists);
  const isAuth = useAppSelector(getIsAuth);

  useEffect(() => {
    dispatch(todoThunks.fetchTodoListsTC());
  }, []);

  const addTodoList = useCallback(
    (title: string) => {
      return dispatch(todoThunks.addTodoListTC(title)).unwrap();
    },
    [dispatch],
  );

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <div className={"todoListForm-wrapper"}>
        <AddItemForm addText={addTodoList} />
      </div>
      <div className={"todos-wrapper"}>
        {todoLists.map((tl) => {
          return (
            <div key={tl.id}>
              <TodoList key={tl.id} todoList={tl} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
