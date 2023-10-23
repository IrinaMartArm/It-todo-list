// import { ButtonBase } from "@mui/material"

import { Button } from "@material-ui/core"

type PropsType = {
    name: string
    className?: string
    onClick: ()=> void
}

export const ButtonS = (props: PropsType) => {
    const callbackHandler = () => {
        props.onClick()
    }
    return (  
        <Button
        onClick={callbackHandler} 
        className={props.className}
        variant="outlined"
        color="inherit"
        >
            {props.name}
            </Button>
    ); 
}
