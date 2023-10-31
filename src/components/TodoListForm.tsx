import { ChangeEvent, KeyboardEvent, useState } from "react"
import { ButtonS } from "./Button"
import {Button, IconButton, TextField} from "@material-ui/core"
import { Add, ControlPoint } from "@mui/icons-material"
// import { TextField } from "@mui/material"

type TodoListFormType = {
    addText: (title: string) => void
}

export const TodoListForm = (props: TodoListFormType) => {

    const [text, setText] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if (e.key === 'Enter'){
            addTaskHandler()
        }
    } 

    const addTaskHandler = () => {
        props.addText(text.trim())
        setText('')
    }

    const addTask = () => {
        if(text.trim() !== ''){
            addTaskHandler()
        } else {setError('Field is required')}
    }  

    return (
        <div>
                    {/* <input value={text} 
                            onChange={onChangeHandler}
                            onKeyDown={onKeyDownHandler}
                            className={error ? "error" : ''}
                    />                    */}
            <TextField value={text}
                       variant="outlined"
                       label={error ? error : 'Type value'}
                       size="small"
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       // helperText={error}
                            // className={error ? "error" : ''}
            />
            <IconButton color="inherit" onClick={addTask} >
                <Add/>
            </IconButton>
            {/*<Button variant={"outlined"} color={"primary"} onClick={addTask}>*/}
            {/*    <Add/>*/}
            {/*</Button>*/}
                    {/* {error && <div className="error-message">{error}</div>} */}
        </div>
    )
}