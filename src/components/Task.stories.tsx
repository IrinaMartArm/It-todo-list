import {Task} from "./Task";
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