import {TodoListForm, TodoListFormType} from "../TodoListForm";
import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React from "react";
import {useForm} from "../useForm";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@mui/icons-material";

export const meta: Meta<typeof TodoListForm> = {
    title: 'TODOLISTS/TodoListForm',
    component: TodoListForm,
    tags: ['autodocs'],
    argTypes: {
        addText: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

type Story = StoryObj<typeof TodoListForm>;

// export const AddItemFormStory: Story = {
//     args: {
//         addText: action('Button clicked inside form')
//     },
// };


export const ErrorTodoListForm = React.memo((props: TodoListFormType) => {
    console.log('TodoListForm')

    const {text,
        error,
        addTask,
        onKeyDownHandler,
        onChangeHandler} = useForm(props.addText)


    return (
        <div>
            <TextField value={text}
                       variant="outlined"
                       label={error ? error : 'Type value'}
                       size="small"
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
            />
            <IconButton color="inherit" onClick={addTask} >
                <Add/>
            </IconButton>
        </div>
    )
})
export const ErrorTodoListFormStory = () => <TodoListForm addText={action('clicked')}/>












// export const TodoListFormBase = () => {
//     return <TodoListForm addText={(title) => {alert(title)}}/>
// }