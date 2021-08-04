import React, {FC} from 'react'
import Sc from "../Authorization/AuthCommon/Styles/CommonStyles.module.css";
import S from "./Packs.module.css";
import {MyButton} from "../../Common/MyButton/MyButton";
import {MyDoubleRange} from "../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {MyTextInput} from "../../Common/MyTextInput/MyTextInput";
import MyTable from "../../Common/MyTable/MyTable";
import {CardPackType} from "../../../Store/cardpacks-reducer";
import {timeparser} from "../../../Utils/timeparser";
import IconButton from '@material-ui/core/IconButton/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ArrowForward from '@material-ui/icons/ArrowForward';
import {CardPacksTableActionsType} from "./PacksContainer";
import {NavLink} from "react-router-dom";

type PacksPropsType = {
    rawData: Array<CardPackType>
    currentUserId?: string
    lastUpdatedFlag: string
    handleAction: (id: string, action: CardPacksTableActionsType) => void
    handleLastUpdated: () => void
}

export const Packs: FC<PacksPropsType> = (props) => {
    const {rawData, currentUserId, lastUpdatedFlag, handleAction, handleLastUpdated} = props
    const headerTitles: Array<string | React.ReactNode> = [
        'Name',
        'Cards',
        <span onClick={handleLastUpdated}>Last Updated {lastUpdatedFlag === 'newest' ? '▲' : '▼'}</span>,
        'Created by',
        'Actions']
    const cellData = rawData.map((el: CardPackType) => [
        el.name,
        el.cardsCount,
        timeparser(el.updated),
        el.user_name,
        currentUserId === el.user_id
            ? <IconButton onClick={() => handleAction(el._id, 'delete')}><Delete/></IconButton>
            : null,
        currentUserId === el.user_id
            ? <IconButton onClick={() => handleAction(el._id, 'edit')}><Edit/></IconButton>
            : null,
//        <IconButton onClick={() => handleAction(el._id, 'delete')}><Delete/></IconButton>,
//        <IconButton onClick={() => handleAction(el._id, 'edit')}><Edit/></IconButton>,
        <NavLink to={'/card/' + el._id}>
            <IconButton onClick={() => handleAction(el._id, 'learn')}><ArrowForward/></IconButton>
        </NavLink>
        ,])
    const columnSchema = 'h1 h2 h3 h4 h5 h5 h5'
    const columnWeights = ['16fr', '4fr', '9fr', '10fr', '2fr', '2fr', '2fr',]
    return (
        <div className={Sc.page_container}>
            <div className={S.page}>
                <div className={S.filters__container}>
                    <div className={S.filters__block}>
                        <div className={S.filters__title}>Show packs cards</div>
                        <div>
                            <MyButton>My</MyButton>
                            <MyButton>All</MyButton>
                        </div>
                    </div>
                    <div className={S.filters__block}>
                        <div className={S.filters__title}>Numbers of cards</div>
                        <MyDoubleRange value={[4, 112]}/>
                    </div>
                </div>
                <div className={S.packs__container}>
                    <div className={S.packs__block}>
                        <h3 className={S.packs__title}>Packs list</h3>
                    </div>
                    <div className={S.packs__block}>
                        <div className={S.packs__search}>
                            <MyTextInput/>
                            <MyButton>Add new pack</MyButton>
                        </div>
                    </div>
                    <div className={S.packs__block}>
                        <MyTable cellData={cellData}
                                 headerTitles={headerTitles}
                                 columnSchema={columnSchema}
                                 columnWeights={columnWeights}
                                 tableMaxHeight={'480px'}
                                 cellMinHeight={'48px'}/>
                    </div>
                    <div className={S.packs__block}>

                    </div>
                </div>
            </div>
        </div>
    )
}
