import React from "react";
import { CheckBox } from "components/Elements/CheckBox";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { TaskTypeOfResponse } from "common/api";
import { useTask } from "common/hooks/useTasks";

export type TaskProps = {
  todoId: string;
  task: TaskTypeOfResponse;
};

export const Task = React.memo((props: TaskProps) => {
  const { task } = props;

  let { isDisabled, onRemoveTask, onChangeStatus, onChangeTitle } =
    useTask(props);

  return (
    <li key={task.id} className={"task"}>
      <CheckBox status={task.status} onChange={onChangeStatus} />
      <EditableSpan title={task.title} onChange={onChangeTitle} />
      <IconButton onClick={onRemoveTask} disabled={isDisabled}>
        <Delete />
      </IconButton>
    </li>
  );
});
