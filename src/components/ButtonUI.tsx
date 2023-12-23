
import React from "react";
import Button from "@mui/material/Button";

type PropsType = {
    color: 'inherit' | "primary" | "secondary"
    onClick: () => void
    name: string
    variant: "text" | "outlined" | "contained" | undefined
}

export const ButtonUI = React.memo((props: PropsType) => {
    const callbackHandler = () => {
        props.onClick()
    }
    return (
        <Button onClick={callbackHandler}
                color={props.color}
                variant={props.variant}
                >{props.name}</Button>
    );
})
// <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
