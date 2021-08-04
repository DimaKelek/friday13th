import React, {CSSProperties, FC} from 'react';
import S from "../MyTable.module.css";

type MyTableHeaderPropsType = {
    headerTitles: Array<string | React.ReactNode>
    columnSchema: string
    columnWeights: Array<string>
    cellMinHeight?: string
};
const MyTableHeader: FC<MyTableHeaderPropsType> = (props) => {
    const {
        headerTitles,
        columnSchema,
        columnWeights,
        cellMinHeight} = props
    const headerCeils = headerTitles.map((h: string | React.ReactNode, i) => (
        <div key={i}
             className={S.table__cell__container}
             style={{gridArea: 'h'+(i+1).toString(), minHeight: cellMinHeight}}>
            <div className={S.table__cell}>{h}</div>
        </div>
    ))
    const getColumnsTemplate = (weights: string[]) => {
        return weights.reduce((acc, w) => acc + `minmax(0, ${w}) `, '').trim()
        //  exm. 'minmax(0, 8fr) minmax(0, 100px) ... minmax(0, 1fr)'
    }
    const rowStyle = (): CSSProperties => {
        return {gridTemplateColumns: getColumnsTemplate(columnWeights)}
    }

    const headerRowStyle = ():CSSProperties => {
        return {gridTemplateAreas: `'${columnSchema}'`}
    }
    return (
        <div className={S.table__row__header} style={{...rowStyle(), ...headerRowStyle()}}>
            {headerCeils}
        </div>
    )
}

export default MyTableHeader