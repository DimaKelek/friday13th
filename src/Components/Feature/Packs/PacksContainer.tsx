import React, {FC, useEffect} from 'react'
import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {CardPackType, getCardPacks, toggleLastUpdatedCardPacks} from "../../../Store/cardpacks-reducer";
import {AppStoreType} from "../../../Store/store";

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
    const handleLastUpdated = () => {
        dispatch(toggleLastUpdatedCardPacks())
    }
    const handleAction = (id: string, action: CardPacksTableActionsType) => {
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
    return (
        <Packs rawData={packsData}
               currentUserId={currentUserId}
               lastUpdatedFlag={lastUpdatedFlag}
               handleAction={handleAction}
               handleLastUpdated={handleLastUpdated}/>
    )
}