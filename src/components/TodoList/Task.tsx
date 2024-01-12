import React, { useCallback, useState } from "react";
import { CheckBox } from "../Elements/CheckBox";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import { useAppDispatch } from "common/hooks/Hooks";
import IconButton from "@mui/material/IconButton";
import { tasksThunks } from "components/TodoList/TasksReducer";
import { TaskStatuses, TaskTypeOfResponse } from "common/api";
import { useTask } from "common/hooks/useTasks";

export type TaskProps = {
  todoId: string;
  task: TaskTypeOfResponse;
};

export const Task = React.memo((props: TaskProps) => {
  const { todoId, task } = props;

  let { isDisabled, onRemoveTask, onChangeStatusHandler, onChangeTitle } =
    useTask(props);

  return (
    <li
      key={task.id}
      className={task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <CheckBox status={task.status} onChange={onChangeStatusHandler} />
      <EditableSpan title={task.title} onChange={onChangeTitle} />
      <IconButton onClick={onRemoveTask} disabled={isDisabled}>
        <Delete />
      </IconButton>
    </li>
  );
});
