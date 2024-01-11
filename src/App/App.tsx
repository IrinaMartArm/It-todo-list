import React, { useEffect } from "react";
import "./App.css";
import ButtonAppBar from "../components/Elements/NavBar";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSneckBar";
import { TodoListBox } from "components/TodoList/TodoListsBox";
import { Route, Routes } from "react-router-dom";
import { Login } from "components/Login/Login";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { initialization } from "./AppReducer";
import { getIsInitialized } from "common/utils";

type PropsType = {
  demo?: boolean;
};
function App({ demo = false }: PropsType) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(getIsInitialized);

  useEffect(() => {
    dispatch(initialization());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          width: "100%",
          top: "30%",
          position: "fixed",
          textAlign: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      <div>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<TodoListBox />} />
          <Route path="/404" element={<h1>404: PAGE NOTFOUND</h1>} />
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

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
//                            <TodoList key={tl.id}
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
//             <TodoList key={tl.id}
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
