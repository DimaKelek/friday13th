import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import S from './MyTextInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    errorClassName?: string
}

export const MyTextInput: React.FC<SuperInputTextPropsType> = props => {
    const {type, onChange, onChangeText, onKeyPress, onEnter, error,
        className, errorClassName, ...restProps} = props
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }

    const finalInputClassName = `${error ? S.errorInput : S.mainStyle} ${className}`
    const finalErrorClassName = `${S.error} ${errorClassName || ''}`

    return (
        <>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {error && <span className={finalErrorClassName}>{error}</span>}
        </>
    )
}