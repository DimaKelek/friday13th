import {GetCardPacksRequestType, CardPackType} from "../Store/cardpacks-reducer";
import {instance} from "./api";


export const cardpacksAPI = {
    getCardPacks(data: GetCardPacksRequestType) {
        return instance.get<GetCardPacksResponseType>(`cards/pack`, {params: {...data}})
    },
}

export type GetCardPacksResponseType = {
    cardPacks: Array<CardPackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    token: string
    tokenDeathTime: number
}