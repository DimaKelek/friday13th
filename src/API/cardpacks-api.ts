import {
    GetCardPacksRequestType,
    CardPackType,
    AddCardsPackRequestType,
    DeleteCardsPackRequestType,
    EditCardsPackRequestType
} from "../Store/cardpacks-reducer";
import {instance} from "./api";


export const cardpacksAPI = {
    getCardPacks(data: GetCardPacksRequestType) {
        return instance.get<GetCardPacksResponseType>(`cards/pack`, {params: {...data}})
    },
    addCardPack(data: AddCardsPackRequestType) {
        return instance.post<AddCardPackResponseType>(`cards/pack`, {...data}, {})
    },
    deleteCardPack(data: DeleteCardsPackRequestType) {
        return instance.delete<DeleteCardPackResponseType>(`cards/pack`, {params: {...data}})
    },
    editCardPack(data: EditCardsPackRequestType) {
        return instance.put<EditCardPackResponseType>(`cards/pack`, {...data}, {})
    }
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
type AddCardPackResponseType = any
type DeleteCardPackResponseType = any
type EditCardPackResponseType = any