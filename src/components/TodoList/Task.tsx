import React, { useCallback, useState } from "react";
import { removeTaskTC, updateTaskTC } from "./TasksReducer";
import { CheckBox } from "../Elements/CheckBox";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import { TaskStatuses, TaskTypeOfResponse } from "api/Api";
import { useAppDispatch } from "../hooks/Hooks";
import IconButton from "@mui/material/IconButton";

type TaskProps = {
  todoId: string;
  task: TaskTypeOfResponse;
};

export const Task = React.memo((props: TaskProps) => {
  const { todoId, task } = props;
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const onRemoveTask = useCallback(() => {
    setIsDisabled(true);
    dispatch(removeTaskTC({ todoId, taskId: task.id })).then(() =>
      setIsDisabled(false),
    );
  }, [todoId, task.id]); // props.removeTask(props.id, t.id)

  const onChangeStatusHandler = useCallback(
    (status: TaskStatuses) => {
      dispatch(
        updateTaskTC({
          todoId,
          taskId: task.id,
          domainModel: { status: status },
        }),
      );
    },
    [todoId, task.id],
  );

  const onChangeTitle = useCallback(
    (title: string) => {
      dispatch(
        updateTaskTC({ todoId, taskId: task.id, domainModel: { title } }),
      );
    },
    [todoId, task.id],
  );

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
