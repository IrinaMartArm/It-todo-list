import { ChangeEvent, useState } from "react"

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false)
    let [text, setText] = useState('')

    const activEditMode = () => {
        setEditMode(true)
        setText(props.title)
    }
    const activViewMode = () => {
        setEditMode(false)
        props.onChange(text)
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        editMode 
        ? <input value={text} onBlur={activViewMode} autoFocus onChange={inputHandler}/> 
        : <span onDoubleClick={activEditMode}>{props.title}</span>
    )   
}