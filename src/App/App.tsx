import React, { useEffect } from "react";
import "./App.css";
import ButtonAppBar from "../components/Elements/NavBar";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSneckBar";
import { TodoListBox } from "components/TodoList/TodoListsBox";
import { Route, Routes } from "react-router-dom";
import { Login } from "components/Login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { initialization } from "./AppReducer";
import { useApp } from "common/hooks/useApp";

function App() {
  let { isInitialized, dispatch } = useApp();

  useEffect(() => {
    dispatch(initialization());
  }, []);

  if (!isInitialized) {
    return (
      <div className={"progress"} style={{ textAlign: "center" }}>
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
