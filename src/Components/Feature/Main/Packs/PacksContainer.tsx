import React, {FC, useEffect} from 'react'
import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {
    addCardsPack,
    AddCardsPackRequestType,
    CardPackType,
    getCardPacks, setCurrentPage,
    setSearchValue,
    toggleLastUpdatedCardPacks
} from "../../../../Store/cardpacks-reducer";
import {AppStoreType} from "../../../../Store/store";

type PacksContainerPropsType = {

}
export type CardPacksTableActionsType = 'delete' | 'edit' | 'learn'
export const PacksContainer: FC<PacksContainerPropsType> = ({}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardPacks())
    }, [])
    const packsData = useSelector<AppStoreType, Array<CardPackType>>((state) => state.cardpacks.cardPacks)
    const currentUserId = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const lastUpdatedFlag = useSelector<AppStoreType, string>((state) => state.cardpacks.sortUpdated)
    const currentPage = useSelector<AppStoreType, number>((state) => state.cardpacks.page)
    const cardsPerPage = useSelector<AppStoreType, number>((state) => state.cardpacks.pageCount)
    const cardPacksTotalCount = useSelector<AppStoreType, number>((state) => state.cardpacks.cardPacksTotalCount)
    const handleLastUpdated = () => {
        dispatch(toggleLastUpdatedCardPacks())
    }
    const sendToSearch = (value: string) => {
        dispatch(setSearchValue(value))
        dispatch(getCardPacks())
    }
    const createNewCardsPack = () => {
        const data: AddCardsPackRequestType = {
            cardsPack: {
                name: 'No Hope, No Fate',
                private: false,
                type: "pack"
            }
        }
        dispatch(addCardsPack(data))
    }
    const handleTableAction = (id: string, action: CardPacksTableActionsType) => {
        switch (action) {
            case "learn":  dispatch(1)
                return;
            case "delete": dispatch(2)
                return;
            case "edit": dispatch(3)
                return;
            default: return
        }
    }
    const handleSetCurrentPage = (page: number) => {
        dispatch(setCurrentPage(page))
        dispatch(getCardPacks())
    }
    return (
        <Packs rawData={packsData}
               currentUserId={currentUserId}
               lastUpdatedFlag={lastUpdatedFlag}
               currentPage={currentPage}
               cardsPerPage={cardsPerPage}
               cardPacksTotalCount={cardPacksTotalCount}
               sendToSearch={sendToSearch}
               createNewCardsPack={createNewCardsPack}
               setCurrentPage={handleSetCurrentPage}
               handleTableAction={handleTableAction}
               handleLastUpdated={handleLastUpdated}/>
    )
}