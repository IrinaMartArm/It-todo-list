import React from "react";
import { useAppSelector } from "common/hooks/Hooks";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AppActions } from "App/bll/AppReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

export function ErrorSnackbar() {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(AppActions.setAppErrorAC({ error: null }));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={7000}
      onClose={handleClose}
      sx={{ width: "50%" }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
