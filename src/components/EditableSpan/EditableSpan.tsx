import React, { ChangeEvent, useState } from "react"

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false)
    let [text, setText] = useState('')

    const activeEditMode = () => {
        setEditMode(true)
        setText(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(text)
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={text} onBlur={activeViewMode} autoFocus onChange={inputHandler}/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
})