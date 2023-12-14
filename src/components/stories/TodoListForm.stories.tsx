import {TodoListForm, TodoListFormType} from "../TodoListForm";
import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import React from "react";


const meta: Meta<typeof TodoListForm> = {
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

export default  meta;

type Story = StoryObj<typeof TodoListForm>;

// export const AddItemFormStory: Story = {
//     args: {
//         addText: action('Button clicked inside form')
//     },
// };



export const ErrorTodoListFormStory = () => <TodoListForm addText={action('clicked')}/>
export const DisableTodoListFormStory = () => <TodoListForm addText={action('clicked')} disabled={true}/>












// export const TodoListFormBase = () => {
//     return <TodoListForm addText={(title) => {alert(title)}}/>
// }