import {Task} from "../Task";
// import {Decorator} from "../stories/Decorator";

export default {
    title: 'Task component',
    component: Task,
    // decorator: Decorator
}

export const TaskExample = () => {
    return <>
        <Task todoId={'1'} task={{id: '1', title: 'New Task', isDone: true}}/>
        <Task todoId={'2'} task={{id: '2', title: 'New Task2', isDone: false}}/>
    </>
}




import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {useState} from "react";

export const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    // args: {
    //     task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
    //     todoId: 'fgdosrg8rgjuh'
    // }
};

type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todoId: 'fgdosrg8rgjuh'
    }
};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
    },
};

export const StatusToggle = () => {
    const [task, setTask] = useState({id: '12', title: 'JS', isDone: false})
    return <Task todoId={'fgdosrg8rgjuh'} task={task}/>
}