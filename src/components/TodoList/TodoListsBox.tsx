import { TodoListForm } from "../addItemForm/TodoListForm";
import { TodoList } from "./TodoList";
import React, { useEffect } from "react";
import { useApp } from "common/hooks/useApp";
import { todoThunks } from "components/TodoList/ReduserTodoLists";
import { Navigate } from "react-router-dom";

type PropsType = {
  demo?: boolean;
};

export const TodoListBox = ({ demo = false }: PropsType) => {
  const { todoLists, addTodoList, isAuth, dispatch } = useApp();

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(todoThunks.fetchTodoListsTC());
  }, []);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <div className={"todoListForm-wrapper"}>
        <TodoListForm addText={addTodoList} />
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
