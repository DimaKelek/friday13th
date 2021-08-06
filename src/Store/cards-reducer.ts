import {AppThunk} from "./store";
import {setAppStatus, setError} from "./app-reducer";
import {cardpacksAPI, GetCardPacksResponseType} from "../Api/cardpacks-api";
import {handleServerNetworkError} from "../Components/Feature/Authorization/AuthCommon/utils/errorHandler";
import {
    AddCardsPackRequestType,
    CardPacksActionsType,
    CardPacksStateType, getCardPacks,
    GetCardPacksRequestType,
    setCardPacksData, setRangeValues,
    toggleShowOwnMode
} from "./cardpacks-reducer";
import {cardsAPI, GetCardsResponseType} from "../Api/cards-api";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: "card"
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

const initialState = {
    cards: [] as Array<CardType>,
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 5,
    sortCards: '0grade' as '0grade' | '1grade',

    page: 1,
    pageCount: 7,

    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
}

export const cardsReducer = (state: CardsStateType = initialState, action: CardsActionsType): CardsStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS-DATA":
        case "CARDS/SET-CURRENT-PAGE":
        case "CARDS/SET-SEARCH-VALUE":
        case "CARDS/SET-CARDSPACK-ID":
            return {...state, ...action.payload}
        case "CARDS/TOGGLE-UPDATED-FLAG":
            return {
                ...state,
                sortCards: state.sortCards === "0grade" ? "1grade" : "0grade"
            }
        default: return state
    }
}

export const setCardsData = (data: GetCardsResponseType) =>
    ({type: cardsActionVariables.SET_CARDS_DATA, payload: {...data},}) as const
export const setCardsPackID = (id: string) =>
    ({type: cardsActionVariables.SET_CARDSPACK_ID, payload: {cardsPack_id: id,},}) as const
export const toggleUpdatedFlag = () =>
    ({type: cardsActionVariables.TOGGLE_UPDATED_FLAG, payload: {}}) as const
export const setCurrentPage = (page: number) =>
    ({type: cardsActionVariables.SET_CURRENT_PAGE, payload: {page: page}}) as const
export const setSearchValue = (value: string) =>
    ({type: cardsActionVariables.SET_SEARCH_VALUE, payload: {packName: value}}) as const



export const getCards = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatus("loading"))
        const data: GetCardsRequestType = {
            cardsPack_id: getState().cards.cardsPack_id,
            cardAnswer: getState().cards.cardAnswer,
            cardQuestion: getState().cards.cardQuestion,
            min: getState().cards.min,
            max: getState().cards.max,
            sortCards: getState().cards.sortCards,
            page: getState().cards.page,
            pageCount: getState().cards.pageCount
        }
        const res = await cardsAPI.getCards(data)
        dispatch(setCardsData(res.data))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const addCard = (data: AddCardRequestType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus("loading"))
        await cardsAPI.addCard(data)
        dispatch(getCards())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export type GetCardsRequestType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: '0grade' | '1grade'
    page?: number
    pageCount?: number
}

export type AddCardRequestType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: "card"
    }
}

export type EditCardRequestType = {
    card: {
        _id: string
        question?: string
        answer?: string
        //...  something else?
        comments?: string
    }
}

export type DeleteCardRequestType = {
    id: string
}

type SetCardsPackIDType = ReturnType<typeof setCardsPackID>
type SetCardsDataType = ReturnType<typeof setCardsData>
type ToggleUpdatedFlagType = ReturnType<typeof toggleUpdatedFlag>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetSearchValueType = ReturnType<typeof setSearchValue>
export type CardsStateType = typeof initialState
export type CardsActionsType =
    SetCardsPackIDType
    | SetCardsDataType
    | ToggleUpdatedFlagType
    | SetCurrentPageType
    | SetSearchValueType

const cardsActionVariables = {
    SET_CARDSPACK_ID: "CARDS/SET-CARDSPACK-ID",
    SET_CARDS_DATA: "CARDS/SET-CARDS-DATA",
    TOGGLE_UPDATED_FLAG: "CARDS/TOGGLE-UPDATED-FLAG",
    SET_CURRENT_PAGE: "CARDS/SET-CURRENT-PAGE",
    SET_PAGINATION_OFFSET: "CARDS/SET-PAGINATION-OFFSET",
    SET_SEARCH_VALUE: "CARDS/SET-SEARCH-VALUE",
  //  DELETE: "CARDS/DELETE-CARD",
  //  EDIT: "CARDS/EDIT-CARD",
}