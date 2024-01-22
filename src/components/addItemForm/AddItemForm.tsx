import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { ResponseType } from "common/types";
import styled from "styled-components";

export type TodoListFormType = {
  addText: (title: string) => Promise<unknown>;
  disabled?: boolean;
};

export const AddItemForm = React.memo(
  ({ addText, disabled = false }: TodoListFormType) => {
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) setError(null);
      if (e.key === "Enter") {
        addTaskHandler();
      }
      inputRef?.current?.focus();
    };

    const addTaskHandler = () => {
      addText(text.trim())
        .then(() => setText(""))
        .catch((e: ResponseType) => {
          setError(e.messages[0]);
        });
      setText("");
    };

    const addTask = () => {
      if (text.trim() !== "") {
        addTaskHandler();
      } else {
        setError("Field is required");
      }
      inputRef?.current?.focus();
    };
    const moveError = () => {
      setError(null);
    };
    console.log(inputRef);
    return (
      <div>
        <TextField
          inputRef={inputRef}
          value={text}
          variant="outlined"
          label={error ? "" : "Type value"}
          size="small"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          error={!!error}
          disabled={disabled}
          onBlur={moveError}
        />
        <IconButton color="inherit" onClick={addTask} disabled={disabled}>
          <Add />
        </IconButton>
        {error && <ErrorText>{error}</ErrorText>}
      </div>
    );
  },
);

const ErrorText = styled.div`
  color: red;
  padding: 3px;
`;
