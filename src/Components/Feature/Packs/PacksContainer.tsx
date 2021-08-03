import React, {FC, useEffect} from 'react'
import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {CardPackType, getCardPacks} from "../../../Store/cardpacks-reducer";
import {AppStoreType} from "../../../Store/store";

type PacksContainerPropsType = {

}
export const PacksContainer: FC<PacksContainerPropsType> = ({}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardPacks())
    }, [])
    const packsData = useSelector<AppStoreType, Array<CardPackType>>((state) => state.cardpacks.cardPacks)
    const currentUserId = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    return (
        <Packs data={packsData} currentUserId={currentUserId}/>
    )
}