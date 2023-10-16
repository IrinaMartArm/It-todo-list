import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"

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
                    <input value={text} 
                            onChange={onChangeHandler}
                            onKeyDown={onKeyDownHandler}
                            className={error ? "error" : ''}
                            />
                    <Button name="+" callback={addTask}/>       
                    {error && <div className="error-message">{error}</div>}
                </div>
    )
}