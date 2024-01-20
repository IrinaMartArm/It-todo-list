import { useAppDispatch } from "common/hooks/Hooks";
import { useCallback, useState } from "react";
import { tasksThunks } from "components/TodoList/bll/TasksReducer";
import { TaskStatuses } from "common/api";
import { TaskProps } from "components/TodoList/ui/Task";

export const useTask = (props: TaskProps) => {
  const { todoId, task } = props;
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const onRemoveTask = useCallback(() => {
    setIsDisabled(true);
    dispatch(tasksThunks.removeTaskTC({ todoId, taskId: task.id })).then(() =>
      setIsDisabled(false),
    );
  }, [todoId, task.id]); // props.removeTask(props.id, t.id)

  const onChangeStatusHandler = useCallback(
    (status: TaskStatuses) => {
      dispatch(
        tasksThunks.updateTaskTC({
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
        tasksThunks.updateTaskTC({
          todoId,
          taskId: task.id,
          domainModel: { title },
        }),
      );
    },
    [todoId, task.id],
  );

  return {
    dispatch,
    isDisabled,
    setIsDisabled,
    onRemoveTask,
    onChangeStatusHandler,
    onChangeTitle,
  };
};
