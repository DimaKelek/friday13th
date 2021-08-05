import React, {FC} from 'react';
import S from './MyPaginator.module.css'
import {MyButton} from "../MyButton/MyButton"; // TODO: resolve external component dependency
type MyPaginatorPropsType = {
    currentPage: number
    itemsPerPage: number
    itemsTotalCount: number
    setCurrentPage: (page: number) => void
};
export const MyPaginator: FC<MyPaginatorPropsType> = ({
                                                          currentPage,
                                                          itemsPerPage,
                                                          itemsTotalCount,
                                                          setCurrentPage}) => {
    const pagesCount = Math.ceil(itemsTotalCount/itemsPerPage)
    const pagesVisibleSet = []
    for (let i = 1; i <= pagesCount; i++) {
        if (pagesCount <= 7) { // in case of less or equal 7 pages
            pagesVisibleSet.push(i) // it's not necessary, but will be useful in future
        }
        else if ((i <= 6 && currentPage <= 3)  // while first three pages are active
            || i === pagesCount       // pagination will be: 1 2 3 4 5 6 last
            || i === 1) {
            pagesVisibleSet.push(i)
        }
        else if ((i > pagesCount - 6 && currentPage >= pagesCount - 3) // while last three pages are active
            || i === pagesCount                   //  pagination will be LIKE: 1 95 96 97 98 99 100
            || i === 1) {
            pagesVisibleSet.push(i)
        }
        else if ((i < currentPage + 3 && i > currentPage - 3) // in other cases
            || i === pagesCount             //  pagination will be LIKE: 1 5 6 7 8 9 last
            || i === 1) {
            pagesVisibleSet.push(i)
        }
    }
    const pages = pagesVisibleSet.map((p: number) => (
        currentPage === p
            ? <MyButton key={p}
                        variant={"purple"}
                        style={{minWidth: '45px', fontSize: '13px',}}><b>{p} </b></MyButton>
            : <MyButton key={p}
                        variant={"light"}
                        style={{minWidth: '45px', fontSize: '13px',}}
                        onClick={() => setCurrentPage(p)}>{p} </MyButton>
    ))
    return (
        <div className={S.paginator__container}>
            <div className={S.paginator}>
                <MyButton onClick={() => setCurrentPage(currentPage-1)}
                          disabled={currentPage===1}
                          variant={"standard"}
                          style={{minWidth: '45px', fontSize: '13px',}}><b>{'◄'}</b></MyButton>
                {pages}
                <MyButton onClick={() => setCurrentPage(currentPage+1)}
                          disabled={currentPage===pagesCount}
                          variant={"standard"}
                          style={{minWidth: '45px', fontSize: '13px',}}><b>{'►'}</b></MyButton>
            </div>
        </div>
    )
}