import React, {FC, useEffect} from 'react'
import {Packs} from "./Packs";
import {useDispatch} from "react-redux";
import {getCardPacks} from "../../../Store/cardpacks-reducer";

type PacksContainerPropsType = {

}
export const PacksContainer: FC<PacksContainerPropsType> = ({}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardPacks())
    }, [])
    return (
        <Packs />
    )
}