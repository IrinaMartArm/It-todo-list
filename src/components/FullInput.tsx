import { ChangeEvent, useState } from "react";

type FullInputPropsType = {
    addMessage: (input: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    const [inputValue, setinputValue] = useState('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setinputValue(e.currentTarget.value)
    }

    const buttonHandler = () => {
        props.addMessage(inputValue)
        setinputValue('')
    }

    return (  
        <div>
            <input value={inputValue} onChange={inputHandler}/>
            <button onClick={buttonHandler}>+</button>
        </div>
    );
}
