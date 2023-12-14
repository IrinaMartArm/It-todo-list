import React from 'react';
import { useAppSelector} from "./hooks/Hooks";
import {setErrorAC} from "./state/AppReducer";
import {useDispatch} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


// function Alert(props: AlertProps) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }


// export function ErrorSnackbar() {
//
//     const error = useAppSelector(state => state.app.error)
//     const dispatch = useDispatch()
//
//     // const [open, setOpen] = React.useState(false);
//
//     const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         dispatch(setErrorAC(null))
//         // setOpen(false);
//     };
//
//     return (
//             // <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
//             //     <Alert onClose={handleClose} severity="success">
//             //         {error}
//             //     </Alert>
//             // </Snackbar>
//     // <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
//     //     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//     //         This is a success message!
//     //     </Alert>
//     // </Snackbar>
//
// );
// }





import Stack from '@mui/material/Stack';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </Stack>
    );
}