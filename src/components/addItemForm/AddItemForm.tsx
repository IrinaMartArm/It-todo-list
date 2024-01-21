import React from "react";
import { Add } from "@mui/icons-material";
import { useForm } from "common/hooks/useForm";
import { IconButton, TextField } from "@mui/material";

export type TodoListFormType = {
  addText: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo(
  ({ addText, disabled = false }: TodoListFormType) => {
    const { text, error, addTask, onKeyDownHandler, onChangeHandler } =
      useForm(addText);

    return (
      <div>
        <TextField
          value={text}
          variant="outlined"
          label={error ? error : "Type value"}
          size="small"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          error={!!error}
          disabled={disabled}
        />
        <IconButton color="inherit" onClick={addTask} disabled={disabled}>
          <Add />
        </IconButton>
      </div>
    );
  },
);

// const [text, setText] = useState('')
// const [error, setError] = useState<string | null>(null)
//
// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setText(e.currentTarget.value)
// }
//
// const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
//     if(error) setError(null)
//     if (e.key === 'Enter'){
//         addTaskHandler()
//     }
// }
//
// const addTaskHandler = () => {
//     props.addText(text.trim())
//     setText('')
// }
//
// const addTask = () => {
//     if(text.trim() !== ''){
//         addTaskHandler()
//     } else {setError('Field is required')}
// }
