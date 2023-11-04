
import * as React from 'react';
import {Checkbox} from "@material-ui/core";
import {ChangeEvent} from "react";

type Props = {
    checked: boolean
    onChange: (checked: boolean) => void
};

export function CheckBox(props: Props) {

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.checked)
    }

    return (
        <Checkbox checked={props.checked}  color={"primary"} onChange={onChangeStatusHandler}/>
    );
}



