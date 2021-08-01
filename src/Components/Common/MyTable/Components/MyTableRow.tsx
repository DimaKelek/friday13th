import React, {CSSProperties, FC} from 'react';
import S from "../MyTable.module.css";
import MyTableCell from "./MyTableCell";

type MyTableRowPropsType = {
    cells: Array<string | React.ReactNode>
    columnWeights: Array<string>
};
const MyTableRow: FC<MyTableRowPropsType> = (props) => {
    const {
        cells,
        columnWeights,
        ...restProps} = props
    const getColumnsTemplate = (weights: string[]) => {
        return weights.reduce((acc, w) => acc + `minmax(0, ${w}) `, '').trim()
        //  exm. 'minmax(0, 8fr) minmax(0, 100px) ... minmax(0, 1fr)'
    }
    const rowStyle = (): CSSProperties => {
        return {gridTemplateColumns: getColumnsTemplate(columnWeights)}
    }
    const mappedCells = cells.map((c, i) => (
        <MyTableCell key={i} children={c}/>
    ))
    return (
        <div className={S.table__row} style={rowStyle()}>
            {mappedCells}
        </div>
    )
}

export default MyTableRow