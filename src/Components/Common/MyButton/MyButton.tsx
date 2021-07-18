import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import S from "./MyButton.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type MyButtonPropsType = DefaultButtonPropsType & {}

export const MyButton: React.FC<MyButtonPropsType> = props => {
    const {disabled, onClick, className, children, ...restProps} = props
    const finalClassName = `${S.button} ${className}`

    return (
        <div className={S.button_box}>
            <button
                className={finalClassName}
                onClick={onClick}
                disabled={disabled}
                {...restProps}
            >{children}</button>
        </div>
    );
}