import React, {FC, useState} from 'react'
import Sc from "../../Authorization/AuthCommon/Styles/CommonStyles.module.css";
import S from "./Packs.module.css";
import {CardPackType} from "../../../../Store/cardpacks-reducer";
import {CardPacksTableActionsType} from "./PacksContainer";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {useSelector} from "react-redux";
import {Filters} from "./Filters/Filters";
import {Content} from "./Content/Content";
import {AppStoreType} from "../../../../Store/store";
import {CircularProgress} from "@material-ui/core";

type PacksPropsType = {
    appStatus: RequestStatusType
    rangeValues: [number, number]
    rawData: Array<CardPackType>
    lastUpdatedFlag: string
    currentPage: number
    cardsPerPage: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    showOwnMode: boolean
    sendToSearch: (value: string) => void
    createNewCardsPack: () => void
    handleSetRangeValues: ([min, max]: Array<number>) => void
    handleToggleShowOwnMode: () => void
    handleTableAction: (id: string, action: CardPacksTableActionsType) => void
    handleLastUpdated: () => void
    setCurrentPage: (page: number) => void
}

export const Packs: FC<PacksPropsType> = (props) => {
    const {
        appStatus,
        rangeValues,
        rawData,
        lastUpdatedFlag,
        currentPage,
        cardsPerPage,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
        showOwnMode,
        sendToSearch,
        createNewCardsPack,
        handleToggleShowOwnMode,
        handleSetRangeValues,
        handleTableAction,
        handleLastUpdated,
        setCurrentPage
    } = props
    const [addMode, toggleAddMode] = useState(false)
    const currentUserId = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)

    return ( // TODO: add backgroundColor styles to embedded components while loading, exclude bgc from preloader
        <div className={Sc.page_container}>
            <div className={S.page}>
                {appStatus === "loading" && <div
                    style={{position: 'fixed',
                        display: "flex",
                        zIndex: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: 'center',
                        width: '1100px',
                        height: '100%',
                        backgroundColor: 'rgba(200, 200, 200, 0.3)'}}>
                    <CircularProgress/>
                </div>}
                {addMode ? <div className={S.modal}> </div> : null}
                <Filters appStatus={appStatus}
                         showOwnMode={showOwnMode}
                         rangeValues={rangeValues}
                         minCardsCount={minCardsCount}
                         maxCardsCount={maxCardsCount}
                         handleSetRangeValues={handleSetRangeValues}
                         handleToggleShowOwnMode={handleToggleShowOwnMode}/>
                <Content rawData={rawData}
                         currentUserId={currentUserId}
                         lastUpdatedFlag={lastUpdatedFlag}
                         currentPage={currentPage}
                         cardsPerPage={cardsPerPage}
                         cardPacksTotalCount={cardPacksTotalCount}
                         setCurrentPage={setCurrentPage}
                         sendToSearch={sendToSearch}
                         handleLastUpdated={handleLastUpdated}
                         handleTableAction={handleTableAction}
                         createNewCardsPack={createNewCardsPack}/>
            </div>
        </div>
    )
}
