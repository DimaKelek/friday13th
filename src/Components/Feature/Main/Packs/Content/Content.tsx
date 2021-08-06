import React, {FC} from 'react'
import S from "../Packs.module.css";
import {MyTextInput} from "../../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import MyTable from "../../../../Common/MyTable/MyTable";
import {MyPaginator} from "../../../../Common/MyPaginator/MyPaginator";
import {MySelect} from "../../../../Common/MySelect/MySelect";
import {CardPackType} from "../../../../../Store/cardpacks-reducer";
import {timeparser} from "../../../../../Utils/timeparser";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import {NavLink} from "react-router-dom";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {CardPacksTableActionsType} from "../PacksContainer";

type ContentPropsType = {
    rawData: Array<CardPackType>
    currentUserId?: string
    lastUpdatedFlag: string
    currentPage: number
    cardsPerPage: number
    cardPacksTotalCount: number
    sendToSearch: (value: string) => void
    createNewCardsPack: () => void
    handleTableAction: (id: string, action: CardPacksTableActionsType) => void
    handleLastUpdated: () => void
    setCurrentPage: (page: number) => void

}
export const Content: FC<ContentPropsType> = (props) => {
    const {rawData, currentUserId, lastUpdatedFlag,
        currentPage, cardsPerPage, cardPacksTotalCount,
        sendToSearch, createNewCardsPack, handleTableAction,
        handleLastUpdated, setCurrentPage} = props
    const headerTitles: Array<string | React.ReactNode> = [
        'Name',
        'Cards',
        <span onClick={handleLastUpdated}>Last Updated {lastUpdatedFlag === 'newest' ? '▲' : '▼'}</span>,
        'Created by',
        'Actions']
    const cellData = rawData.length > 0
        ? rawData.map((el: CardPackType) => [
        el.name,
        el.cardsCount,
        timeparser(el.updated),
        el.user_name,
        currentUserId === el.user_id
            ? <IconButton onClick={() => handleTableAction(el._id, 'delete')}><Delete/></IconButton>
            : null,
        currentUserId === el.user_id
            ? <IconButton onClick={() => handleTableAction(el._id, 'edit')}><Edit/></IconButton>
            : null,
        <NavLink to={'/cards/' + el._id}>
            <IconButton onClick={() => handleTableAction(el._id, 'learn')}><ArrowForward/></IconButton>
        </NavLink>
        ,])
        : [['There is nothing here yet']]
    const columnSchema = 'h1 h2 h3 h4 h5 h5 h5'
    const columnWeights = ['16fr', '4fr', '8fr', '10fr', '2fr', '2fr', '2fr',]
    return (
        <div className={S.packs__container}>
            <div className={S.packs__block}>
                <h3 className={S.packs__title}>Packs list</h3>
            </div>
            <div className={S.packs__block}>
                <div className={S.packs__search}>
                    <MyTextInput onChangeText={sendToSearch}/>
                    <MyButton onClick={createNewCardsPack}>Add new pack</MyButton>
                </div>
            </div>
            <div className={S.packs__block}>
                <MyTable cellData={cellData}
                         headerTitles={headerTitles}
                         columnSchema={columnSchema}
                         columnWeights={columnWeights}
                         tableMaxHeight={'400px'}
                         cellMinHeight={'48px'}/>
            </div>
            <div className={S.packs__block}>
                <div>
                    <MyPaginator currentPage={currentPage}
                                 itemsPerPage={cardsPerPage}
                                 itemsTotalCount={cardPacksTotalCount}
                                 setCurrentPage={setCurrentPage}/>
                </div>
               {/* <div><MySelect options={['10', '20', '30']}> </MySelect></div>*/}
            </div>
        </div>
    )
}