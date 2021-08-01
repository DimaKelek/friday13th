import React, {CSSProperties, FC} from 'react';
import S from './MyTable.module.css'
import MyTableHeader from "./Components/MyTableHeader";
import MyTableRow from "./Components/MyTableRow";
import {MyButton} from "../MyButton/MyButton";

type MyTablePropsType = {
    cellData: Array<Array<string | React.ReactNode>>
    headerTitles?: Array<string | React.ReactNode>
    columnSchema?: string
    columnWeights?: Array<string>
    rowMinHeight?: string
}
const MyTable: FC<MyTablePropsType> = (props) => {
    const {
        cellData,
        headerTitles = ['1', '2',],
        columnSchema = `'h1 h2'`,
        columnWeights = ['1fr', '1fr',],
        rowMinHeight = '48px',
        } = props

    const tableRows = cellData.map((el, i) => (
        <MyTableRow key={i} cells={el} columnWeights={columnWeights}/>
    ))
    return (
        <div className={S.table}  {...props}>
            <MyTableHeader headerTitles={headerTitles} columnWeights={columnWeights} columnSchema={columnSchema}/>
            {tableRows}
        </div>
    )
}

export default MyTable