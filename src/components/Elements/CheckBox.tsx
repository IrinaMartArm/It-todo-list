import * as React from "react";
import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TaskStatuses } from "common/api";

type Props = {
  status: TaskStatuses;
  onChange: (status: TaskStatuses) => void;
};

export const CheckBox = React.memo((props: Props) => {
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
    );
  };

  return (
    <Checkbox
      checked={props.status === TaskStatuses.Completed}
      color={"primary"}
      onChange={onChangeStatusHandler}
    />
  );
});
