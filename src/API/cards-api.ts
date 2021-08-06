import {instance} from "./api";
import {
    AddCardRequestType,
    CardType,
    DeleteCardRequestType,
    EditCardRequestType,
    GetCardsRequestType
} from "../Store/cards-reducer";


export const cardsAPI = {
    getCards(data: GetCardsRequestType) {
        return instance.get<GetCardsResponseType>(`cards/card`, {params: {...data}})
    },
    addCard(data: AddCardRequestType) {
        return instance.post<AddCardResponseType>(`cards/card`, {...data}, {})
    },
    deleteCard(data: DeleteCardRequestType) {
        return instance.delete<DeleteCardResponseType>(`cards/card`, {params: {...data}})
    },
    editCard(data: EditCardRequestType) {
        return instance.put<EditCardResponseType>(`cards/card`, {...data}, {})
    }
}


export type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
type AddCardResponseType = any
type DeleteCardResponseType = any
type EditCardResponseType = any