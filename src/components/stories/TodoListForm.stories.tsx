import {TodoListForm} from "../TodoListForm";

export default {
    title: 'Add form component',
    component: TodoListForm
}

export const TodoListFormBase = () => {
    return <TodoListForm addText={(title) => {alert(title)}}/>
}