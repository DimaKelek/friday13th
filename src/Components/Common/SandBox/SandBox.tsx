import React, {useState} from "react";
import {MyTextInput} from "../MyTextInput/MyTextInput";
import S from "./SandBox.module.css"
import {MyButton} from "../MyButton/MyButton";
import {MyCheckbox} from "../MyCheckbox/MyCheckbox";
import {MyEditableSpan} from "../MyEditableSpan/MyEditableSpan";
import {MySelect} from "../MySelect/MySelect";
import {MyRadioButton} from "../MyRadioButton/MyRadioButton";

export const SandBox: React.FC = props => {
    const options = ["React", "Redux", "Typescript"]
    const [value, setValue] = useState<string>("Yooooooooo")
    const [select, setSelect] = useState<string>(options[0])
    const [text, setText] = useState<string>('')

    const error = text ? '' : 'error'
    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }
    const myButtonCallback = () => {
        alert("Здароукиииииииииииии!!")
    }

    return (
        <div className={S.sandBox_container}>
            <div className={S.textInput_box}>
                <span>Text Input</span>
                <div>
                    <MyTextInput
                        value={text}
                        onChangeText={setText}
                        onEnter={showAlert}
                        error={error}
                    />
                </div>
            </div>
            <div className={S.button_box}>
                <span>My Button</span>
                <div><MyButton onClick={myButtonCallback}>Button</MyButton></div>
            </div>
            <div className={S.reactCheckbox_box}>
                <span>My ReactCheckbox</span>
                <div><MyCheckbox>Test Label</MyCheckbox></div>
            </div>
            <div className={S.editableSpan_box}>
                <span>My EditableSpan</span>
                <div>
                    <MyEditableSpan
                        value={value}
                        onChangeText={setValue}
                        spanProps={{children: value ? undefined : 'enter text...'}}
                    />
                </div>
            </div>
            <div className={S.mySelect_box}>
                <span>My Select</span>
                <div>
                    <MySelect
                        options={options}
                        value={select}
                        onChangeOption={setSelect}
                    />
                </div>
            </div>
            <div className={S.radio_box}>
                <span>My Radio Button</span>
                <div>
                    <MyRadioButton
                        name={'radio'}
                        options={options}
                        value={select}
                        onChangeOption={setSelect}
                    />
                </div>
            </div>
        </div>
    )
}