import { ChangeEvent, useState } from "react";

type FullInputPropsType = {
    addMessage: (input: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    const [inputValue, setInputValue] = useState('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const buttonHandler = () => {
        props.addMessage(inputValue)
        setInputValue('')
    }

    return (  
        <div>
            <input value={inputValue} onChange={inputHandler}/>
            <button onClick={buttonHandler}>+</button>
        </div>
    );
}
