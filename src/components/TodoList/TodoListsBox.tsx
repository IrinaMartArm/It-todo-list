import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoListForm} from "../addItemForm/TodoListForm";
import {TodoList} from "./TodoList";
import React, {useEffect} from "react";
import {useApp} from "../hooks/useApp";
import {useAppDispatch} from "../hooks/Hooks";
import {fetchTodoListsTC} from "./ReduserTodoLists";

type PropsType = {
    demo?: boolean
}

export const TodoListBox = ({demo = false}: PropsType) => {

    const {todoLists, addTodoList} = useApp()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTodoListsTC())
    }, []);

    return (
        <Container fixed>
                <Grid container style={{padding: "20px", justifyContent: "center"}}>
                    <TodoListForm addText={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{justifyContent: "center"}}>
                    {
                        todoLists.map(tl => {

                            return <Grid key={tl.id} item>
                                <Paper>
                                    <TodoList key={tl.id}
                                              todoList={tl}
                                              // demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
        </Container>

    )
}