import React, {CSSProperties, FC} from 'react';
import S from './MyTable.module.css'

type MyTablePropsType = {};
const MyTable: FC<MyTablePropsType> = ({}) => {
    const rowStyle = (): CSSProperties => {
        return {gridTemplateColumns: '3fr 1fr 2fr 2fr 1fr 1fr 1fr'}
    }
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
        <div key={d} className={S.table__row} style={rowStyle()}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
        </div>))
    return (
        <div className={S.table}>
            <div className={S.table__row__header} style={rowStyle()}>
                <div>Name</div>
                <div>Cards</div>
                <div>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </div>
            {data}
        </div>
    )
}

export default MyTable