import React, {useCallback} from 'react';
import './App.css';
import { TodoListForm } from './components/TodoListForm';
import {addTodolistAC} from "./components/state/ReduserTodoLists";
// import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC} from "./components/state/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./components/state/Store";
import {TodoListRedux} from "./components/TodoListRedux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Button, IconButton, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Container, Grid, Menu} from "@mui/material";



export type FilterValuesType = 'All' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<RootReducerType, Array<TodoListType>>(state => state.todoLists)

    // const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
    //     dispatch(changeTodolistFilterAC(todolistId, value))
    // }, [])
    //
    // const removeTodoList = useCallback((todolistId: string) => {
    //     dispatch(removeTodolistAC(todolistId))
    //     // dispatch(removeTodolistAC(todolistId))
    // }, [])
    //
    // const changeTodoTitle = useCallback((todolistId: string, title: string) => {
    //     const action = changeTodolistTitleAC(todolistId, title)
    //     dispatch(action)
    // }, [])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])



    return (

    <div className="App">
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color='primary' aria-label="menu">
                {/*<Menu autoFocus={}/>*/}
            </IconButton>
            <Typography variant="h6">
                News
            </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
    <Container fixed >
        <Grid container style={{padding: "20px"}}>
            <TodoListForm addText={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {


                    return <Grid key={tl.id} item>
                        <Paper>
                           <TodoListRedux key={tl.id}
                               id={tl.id}
                               title={tl.title}
                               filter={tl.filter}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </Container>
</div>
    );
}



export default AppWithRedux;





//         <div className="App">
//             <ButtonAppBar/>
//             <Grid container spacing={3} style={{ backgroundColor: 'lemonchiffon', minHeight: '100vh', padding: '30px',      alignItems: 'start',  flexWrap: 'wrap'}}>
//                 <Grid item xs={12}>
//                     <TodoListForm addText={addTodoList}/>
//                 </Grid>
//                 <Grid item container spacing={5} style={{justifyContent: 'center'}}>
//
//                     {todoLists.map((tl)=>{
//
//                     return (
//                         <Grid item key={tl.todolistId}>
//                             <Paper  style={{backgroundColor: 'beige', padding: '20px', border: '2px solid gray'}}> //elevation={6}
//                                 <TodoList key={tl.todolistId}
//                                             id={tl.todolistId}
//                                             title={tl.title}
//                                             removeTodoList={removeTodoList}
//                                             changeFilter={changeFilter}
//                                             filter={tl.filter}
//                                             changeTodoTitle={changeTodoTitle}
//                                 />
//                             </Paper>
//                         </Grid>
//                     )
//                 })}
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }








// <div className="App">
//     <AppBar position="static">
//         <Toolbar>
//             <IconButton edge="start" color="inherit" aria-label="menu">
//                 <Menu/>
//             </IconButton>
//             <Typography variant="h6">
//                 News
//             </Typography>
//             <Button color="inherit">Login</Button>
//         </Toolbar>
//     </AppBar>
//     <Container fixed>
//         <Grid container style={{padding: "20px"}}>
//             <TodoListForm addText={addTodoList}/>
//         </Grid>
//         <Grid container spacing={3}>
//             {
//                 todolists.map(tl => {
//
//
//                     return <Grid key={tl.id} item>
//                         <Paper style={{padding: "10px"}}>
//                            <TodoListRedux key={tl.id}
// //                            id={tl.id}
// //                            title={tl.title}
// //                            filter={tl.filter}
//                             />
//                         </Paper>
//                     </Grid>
//                 })
//             }
//         </Grid>
//     </Container>
// </div>



// <div className="App">
//     <TodoListForm addText={addTodoList}/>
//     {todoLists.map((tl)=>{
//         return (
//             <TodoListRedux key={tl.id}
//                            id={tl.id}
//                            title={tl.title}
//                            filter={tl.filter}
//                 // removeTodoList={removeTodoList}
//                 // changeFilter={changeFilter}
//                 // changeTodoTitle={changeTodoTitle}
//             />
//         )
//     })}
// </div>