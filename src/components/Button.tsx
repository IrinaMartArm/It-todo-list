// import { ButtonBase } from "@mui/material"

import { Button } from "@material-ui/core"
import React from "react";

type PropsType = {
    name: string
    className?: string
    onClick: ()=> void
}

export const ButtonS = React.memo((props: PropsType) => {
    const callbackHandler = () => {
        props.onClick()
    }
    return (
        <Button
            onClick={callbackHandler}
            className={props.className}
            variant="outlined"
            color="inherit"
            style={{maxWidth: '30px', maxHeight: '20px', minWidth: '20px', minHeight: '10px'}}
        >
            {props.name}
        </Button>
    );
})
// <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
