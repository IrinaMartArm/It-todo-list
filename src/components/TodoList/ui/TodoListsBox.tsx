import { TodoListForm } from "components/addItemForm/TodoListForm";
import { TodoList } from "components/TodoList/ui/TodoList";
import React, { useEffect } from "react";
import { useApp } from "common/hooks/useApp";
import { todoThunks } from "components/TodoList/bll/ReduserTodoLists";
import { Navigate } from "react-router-dom";

export const TodoListBox = () => {
  const { todoLists, addTodoList, isAuth, dispatch } = useApp();

  useEffect(() => {
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
