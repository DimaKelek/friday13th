import React, {FC, useEffect} from 'react'
import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {getCardPacks} from "../../../Store/cardpacks-reducer";
import {AppStateType} from "../../../Store/app-reducer";
import {AppStoreType} from "../../../Store/store";

type PacksContainerPropsType = {

}
export const PacksContainer: FC<PacksContainerPropsType> = ({}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardPacks())
    }, [])
    const packsData = useSelector<AppStoreType, any>((state) => state.cardpacks.cardPacks)
    return (
        <Packs data={packsData}/>
    )
}