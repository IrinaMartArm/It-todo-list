import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useForm = (onItemAdd: (title: string)=>void) => {

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
        onItemAdd(text.trim())
        setText('')
    }

    const addTask = () => {
        if(text.trim() !== ''){
            addTaskHandler()
        } else {setError('Field is required')}
    }

    return {text, error, addTask, onKeyDownHandler, onChangeHandler}
}