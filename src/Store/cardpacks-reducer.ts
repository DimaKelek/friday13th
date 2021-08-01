import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Feature/Authorization/AuthCommon/utils/errorHandler";
import {cardpacksAPI, GetCardPacksResponseType} from "../Api/cardpacks-api";

export type IncomingCardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

type InternalCardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    cardsCount: number
    updated: string
}


const initialState = {
    incomingCardPacks: [] as Array<IncomingCardPackType>,
    cardPacks: [] as Array<InternalCardPackType>,
    packName: '' as 'english' | '',
    filterMin: 0,
    filterMax: 100,
    sortUpdated: 'newest' as 'newest' | 'oldest',
    currentPage: 1,
    pageCount: 10,
    isOwner: false
}

export const cardpacksReducer = (state: CardPacksStateType = initialState, action: CardPacksActionsType): CardPacksStateType => {
    switch (action.type) {
        case "CARDPACKS/SET-CARDPACKS-DATA": return {
            ...state, ...action.payload
        }
        default: return state
    }
}

// actions
export const setCardPacksData = (data: GetCardPacksResponseType) =>
    ({type: cardpacksActionVariables.SET_CARDPACKS_DATA, payload: {...data}}) as const

export const getCardPacks = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatus("loading"))
        const data: GetCardPacksRequestType = {
            page: getState().cardpacks.currentPage,
            pageCount: getState().cardpacks.pageCount,
            max: getState().cardpacks.filterMax,
            min: getState().cardpacks.filterMin,
            packName: getState().cardpacks.packName,
            sortPacks: getState().cardpacks.sortUpdated === 'newest' ? '0updated' : '1updated',
            user_id: getState().auth.userData?._id
        }
        const res = await cardpacksAPI.getCardPacks(data)
        dispatch(setCardPacksData(res.data))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

// types
export type GetCardPacksRequestType = {
    packName?: '' | 'english'
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type CardPacksStateType = typeof initialState
type SetCardPacksDataType = ReturnType<typeof setCardPacksData>
export type CardPacksActionsType = SetCardPacksDataType

// variables
const cardpacksActionVariables = {
    SET_CARDPACKS_DATA: "CARDPACKS/SET-CARDPACKS-DATA",

}