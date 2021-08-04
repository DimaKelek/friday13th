import React, {FC} from 'react';
import S from "../MyTable.module.css";

type MyTableCeilPropsType = {
    cellMinHeight?: string
};
const MyTableCell: FC<MyTableCeilPropsType> = ({cellMinHeight, children}) => {
    return (
        <div className={S.table__cell__container} style={{minHeight: cellMinHeight}}>
            <div className={S.table__cell}>{children}</div>
        </div>
    )
}

export default MyTableCell