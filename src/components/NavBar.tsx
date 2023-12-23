import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "./hooks/Hooks";
import {logoutTC} from "./state/AuthReducer";
import {useCallback} from "react";
import {RequestStatus} from "./state/AppReducer";

export default function ButtonAppBar() {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatus>(state => state.app.status)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="static" color={'transparent'}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {isAuth && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}

                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={"secondary"}/>}
        </Box>
    );
}