import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import { IconButton, TextField} from "@material-ui/core"
import { Add } from "@mui/icons-material"


type TodoListFormType = {
    addText: (title: string) => void
}

export const TodoListForm = React.memo((props: TodoListFormType) => {
    console.log('TodoListForm')
    const [text, setText] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(error) setError(null)
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
            <TextField value={text}
                       variant="outlined"
                       label={error ? error : 'Type value'}
                       size="small"
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
            />
            <IconButton color="inherit" onClick={addTask} >
                <Add/>
            </IconButton>
        </div>
    )
})