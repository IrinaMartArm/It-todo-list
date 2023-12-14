import React, {useEffect} from 'react';
import './App.css';
import {TodoListForm } from './components/TodoListForm';
import {TodoListRedux} from "./components/TodoListRedux";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import ButtonAppBar from "./components/NavBar";
import {useApp} from "./useApp";
import {fetchTodoListsTC} from "./components/state/ReduserTodoLists";
import {useAppDispatch} from "./components/hooks/Hooks";
import {ErrorSnackbar} from "./components/ErrorSneckBar";


function AppWithRedux() {

    const {todoLists, addTodoList} = useApp()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, []);

    return (
    <div className="App">
        <ErrorSnackbar/>
        <ButtonAppBar/>
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
