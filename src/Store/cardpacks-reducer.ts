import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Feature/Authorization/AuthCommon/utils/errorHandler";
import {cardpacksAPI, GetCardPacksResponseType} from "../Api/cardpacks-api";

export type CardPackType = {
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

const initialState = {
    cardPacks: [] as Array<CardPackType>,
    page: 1,
    pageCount: 25,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    packName: '' as 'english' | '',
    filterMin: 0,
    filterMax: 100,
    sortUpdated: 'newest' as 'newest' | 'oldest',
    token: '',
    tokenDeathTime: 0,
    showOwnPacks: false
}

export const cardpacksReducer = (state: CardPacksStateType = initialState, action: CardPacksActionsType): CardPacksStateType => {
    switch (action.type) {
        case "CARDPACKS/SET-CARDPACKS-DATA": return {
            ...state,
            ...action.payload
        }
        case "CARDPACKS/TOGGLE-UPDATED-FLAG": return {
            ...state,
            sortUpdated: state.sortUpdated === 'newest' ? 'oldest' : 'newest'
        }
        default: return state
    }
}

// actions
export const setCardPacksData = (data: GetCardPacksResponseType) =>
    ({type: cardpacksActionVariables.SET_CARDPACKS_DATA, payload: {...data},}) as const
export const toggleUpdatedFlag = () =>
    ({type: cardpacksActionVariables.TOGGLE_UPDATED_FLAG, payload: {}}) as const

export const getCardPacks = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatus("loading"))
        const data: GetCardPacksRequestType = {
            page: getState().cardpacks.page,
            pageCount: getState().cardpacks.pageCount,
            max: getState().cardpacks.filterMax,
            min: getState().cardpacks.filterMin,
            packName: getState().cardpacks.packName,
            sortPacks: getState().cardpacks.sortUpdated === 'newest' ? '0updated' : '1updated',
            user_id: getState().cardpacks.showOwnPacks ? getState().auth.userData?._id : ''
        }
        const res = await cardpacksAPI.getCardPacks(data)
        dispatch(setCardPacksData(res.data))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const toggleLastUpdatedCardPacks = (): AppThunk => async (dispatch, getState) => {
    dispatch(toggleUpdatedFlag())
    dispatch(getCardPacks())
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
type ToggleUpdatedFlagType = ReturnType<typeof toggleUpdatedFlag>
export type CardPacksActionsType = SetCardPacksDataType | ToggleUpdatedFlagType

// variables
const cardpacksActionVariables = {
    SET_CARDPACKS_DATA: "CARDPACKS/SET-CARDPACKS-DATA",
    TOGGLE_UPDATED_FLAG: "CARDPACKS/TOGGLE-UPDATED-FLAG",
}