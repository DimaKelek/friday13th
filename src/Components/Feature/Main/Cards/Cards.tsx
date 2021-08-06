import React, {FC, useEffect, useState} from 'react'
import Sc from "../../Authorization/AuthCommon/Styles/CommonStyles.module.css";
import S from "./Cards.module.css";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../Common/MyButton/MyButton";
import MyTable from "../../../Common/MyTable/MyTable";
import {MyPaginator} from "../../../Common/MyPaginator/MyPaginator";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {
    addCard,
    setCurrentPage,
    toggleUpdatedFlag,
    setSearchValue,
    AddCardRequestType,
    CardsStateType,
    getCards,
    CardType
} from '../../../../Store/cards-reducer';
import {timeparser} from "../../../../Utils/timeparser";
import {RequestStatusType, setAppStatus, setNeedUpdate} from "../../../../Store/app-reducer";

type CardsPropsType = {
    
}
export const Cards: FC<CardsPropsType> = ({}) => {
    const dispatch = useDispatch()
    const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const needUpdate = useSelector<AppStoreType, boolean>(state => state.app.needUpdate)

    const {cardsPack_id, cards, cardsTotalCount, cardQuestion,
        } = useSelector<AppStoreType, CardsStateType>((state) => state.cards)
    const currentPage = useSelector<AppStoreType, number>((state) => state.cards.page)
    const cardsPerPage = useSelector<AppStoreType, number>((state) => state.cards.pageCount)
    const lastUpdatedFlag = useSelector<AppStoreType, '0grade' | '1grade'>((state) => state.cards.sortCards)

    const [attemptID, setAttemptID] = useState<number | null>(null)
    useEffect(() => {
        if (needUpdate && appStatus !== 'loading') {
            dispatch(getCards())
            dispatch(setNeedUpdate(false))
        }
    }, [needUpdate, appStatus])
    const requestAttempt = () => {
        let id = setTimeout(async () => {
            dispatch(setAppStatus('loading'))
            await dispatch(getCards())
            setAttemptID(null)
        }, 500)
        setAttemptID(+id)
    }
    useEffect(() => {
        if (attemptID !== null && appStatus !== 'loading') {
            clearTimeout(attemptID)
            requestAttempt()
        }
        else if (appStatus !== 'loading') {
            requestAttempt()
        }
        else dispatch(setNeedUpdate(true))
    }, [currentPage, dispatch, cardQuestion, lastUpdatedFlag])



    const createNewCard = () => {
        const data: AddCardRequestType = {
            card: {
                cardsPack_id: cardsPack_id,
                question: 'Did I ever tell you the definition of insanity?',
                answer: 'Insanity is doing exact same fucking thing over and over again expecting shit to change',
                type: "card"
            }
        }
        dispatch(addCard(data))
    }
    const handleSetCurrentPage = (page: number) => {
        dispatch(setCurrentPage(page))
    }
    const handleLastUpdated = () => {
        dispatch(toggleUpdatedFlag())
    }
    const setToSearch = (value: string) => {
        dispatch(setSearchValue(value))
    }

    const headerTitles: Array<string | React.ReactNode> = [
        'Question',
        'Answer',
        <span onClick={handleLastUpdated}>Last Updated {lastUpdatedFlag === "0grade" ? '▲' : '▼'}</span>,
        'Grade']
    const cellData = cards.map((c: CardType) => [
        c.question,
        c.answer,
        timeparser(c.updated),
        c.grade
    ])
    const columnSchema = 'h1 h2 h3 h4'
    const columnWeights = ['10fr', '10fr', '5fr', '3fr',]
    return (
        <div className={Sc.page_container}>
            <div className={S.page}>
                <div className={S.cards__container}>
                    <div className={S.cards__block}>
                        <span>
                             <NavLink to={"/packs"}>◄   </NavLink>
                        </span>
                        <h3 className={S.cards__title}>Cards list</h3>
                    </div>
                    <div className={S.cards__block}>
                        <div className={S.cards__search}>
                            <MyTextInput onChangeText={setToSearch}/>
                            <MyButton onClick={createNewCard}>Add new pack</MyButton>
                        </div>
                    </div>
                    <div className={S.cards__block}>
                        <MyTable cellData={cellData}
                                 headerTitles={headerTitles}
                                 columnSchema={columnSchema}
                                 columnWeights={columnWeights}
                                 tableMaxHeight={'400px'}
                                 cellMinHeight={'48px'}/>
                    </div>
                    <div className={S.cards__block}>
                        <div>
                            <MyPaginator currentPage={currentPage}
                                         itemsPerPage={cardsPerPage}
                                         itemsTotalCount={cardsTotalCount}
                                         setCurrentPage={handleSetCurrentPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}