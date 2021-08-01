import axios from "axios";
import {GetCardPacksRequestType, IncomingCardPackType} from "../Store/cardpacks-reducer";
import {instance} from "./api";


export const cardpacksAPI = {
    getCardPacks(data: GetCardPacksRequestType) {
        return instance.get<GetCardPacksResponseType>(`cards/pack`, {params: {...data}})
    },
}

export type GetCardPacksResponseType = {
    cardPacks: Array<IncomingCardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}