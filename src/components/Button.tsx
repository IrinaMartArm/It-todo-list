type PropsType = {
    name: string
    className?: string
    callback: ()=> void
}

export const Button = (props: PropsType) => {
    const callbackHandler = () => {
        props.callback()
    }
    return (  
        <button 
        onClick={callbackHandler} 
        className={props.className}
        >
            {props.name}
            </button>
    );
}
