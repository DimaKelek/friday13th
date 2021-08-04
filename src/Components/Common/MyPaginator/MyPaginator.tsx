import React, {FC} from 'react';
import S from './MyPaginator.module.css'
type MyPaginatorPropsType = {
    currentPage: number
    itemsPerPage: number
    itemsTotalCount: number
    setCurrentPage: (page: number) => void
};
export const MyPaginator: FC<MyPaginatorPropsType> = ({
                                                         currentPage,
                                                         itemsPerPage,
                                                         itemsTotalCount}) => {
    const pagesCount = Math.ceil(itemsTotalCount/itemsPerPage)
    const pagesVisibleSet = []
    for (let i = 1; i <= pagesCount; i++) {
        if ((i <= currentPage + 10 && i >= currentPage - 10) || i === pagesCount)
        pagesVisibleSet.push(i)
    }
    const pages = pagesVisibleSet.map(p => (currentPage === p
            ? <span><b>{p}</b></span>
            : <span>{p}</span>
    ))
    return (
        <div className={S.paginator__container}>
            <div className={S.paginator}>
                {pages}
            </div>
            <div className={S.rangeSelector}>

            </div>
        </div>
    )
}