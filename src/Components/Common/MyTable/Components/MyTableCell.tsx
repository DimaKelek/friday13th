import React, {FC} from 'react';
import S from "../MyTable.module.css";

type MyTableCeilPropsType = {

};
const MyTableCell: FC<MyTableCeilPropsType> = ({children}) => {
    return (
        <div className={S.table__cell__container}>
            <div className={S.table__cell}>{children}</div>
        </div>
    )
}

export default MyTableCell