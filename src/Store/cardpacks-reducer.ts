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
    //incoming
    cardPacks: [] as Array<CardPackType>,
    page: 1,
    pageCount: 25,  //packsPerPage
    cardPacksTotalCount: 0,
    maxCardsCount: 0, //filter range offset
    minCardsCount: 0, //filter range offset
    token: '',
    tokenDeathTime: 0,
    //internal
    packName: '',
    filterMin: 0,  //filter range current
    filterMax: 0, //filter range current
    sortUpdated: 'newest' as 'newest' | 'oldest',
    showOwnMode: false
}

export const cardpacksReducer = (state: CardPacksStateType = initialState, action: CardPacksActionsType): CardPacksStateType => {
    switch (action.type) {
        case "CARDPACKS/SET-CARDPACKS-DATA":
        case "CARDPACKS/SET_RANGE_VALUES":
        case "CARDPACKS/SET-SEARCH-VALUE":
        case "CARDPACKS/SET-CURRENT-PAGE":
            return {
                ...state,
                ...action.payload
            }
        case "CARDPACKS/TOGGLE-SHOW-OWN-PACKS-MODE":
            return {
                ...state,
                showOwnMode: !state.showOwnMode
            }
        case "CARDPACKS/TOGGLE-UPDATED-FLAG":
            return {
                ...state,
                sortUpdated: state.sortUpdated === 'newest' ? 'oldest' : 'newest'
            }

        default:
            return state
    }
}

// actions
export const setCardPacksData = (data: GetCardPacksResponseType) =>
    ({type: cardpacksActionVariables.SET_CARDPACKS_DATA, payload: {...data},}) as const
export const toggleUpdatedFlag = () =>
    ({type: cardpacksActionVariables.TOGGLE_UPDATED_FLAG, payload: {}}) as const
export const toggleShowOwnMode = () =>
    ({type: cardpacksActionVariables.TOGGLE_SHOW_OWN_MODE, payload: {}}) as const
export const setRangeValues = (min: number, max: number) =>
    ({type: cardpacksActionVariables.SET_RANGE_VALUES, payload: {filterMin: min, filterMax: max,}}) as const
export const setCurrentPage = (page: number) =>
    ({type: cardpacksActionVariables.SET_CURRENT_PAGE, payload: {page: page}}) as const
export const setSearchValue = (value: string) =>
    ({type: cardpacksActionVariables.SET_SEARCH_VALUE, payload: {packName: value}}) as const



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
            user_id: getState().cardpacks.showOwnMode ? getState().auth.userData?._id : ''
        }
        const res = await cardpacksAPI.getCardPacks(data)
        dispatch(setCardPacksData(res.data))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const addCardsPack = (data: AddCardsPackRequestType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus("loading"))
        await cardpacksAPI.addCardPack(data)
        dispatch(getCardPacks())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const deleteCardsPack = (data: DeleteCardsPackRequestType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus("loading"))
        await cardpacksAPI.deleteCardPack(data)
        dispatch(getCardPacks())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const editCardsPack = (data: EditCardsPackRequestType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus("loading"))
        await cardpacksAPI.editCardPack(data)
        dispatch(getCardPacks())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
// types
export type GetCardPacksRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

export type AddCardsPackRequestType = {
    cardsPack: {
        name: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private: boolean
        type: "pack" | "folder"
    }
}
export type DeleteCardsPackRequestType = {
    id: string
}
export type EditCardsPackRequestType = {
    cardsPack: {
        _id: string
        name: string
        //TODO: add necessary properties
    }
}
export type CardPacksStateType = typeof initialState
type SetCardPacksDataType = ReturnType<typeof setCardPacksData>
type ToggleUpdatedFlagType = ReturnType<typeof toggleUpdatedFlag>
type ToggleShowOwnModeType = ReturnType<typeof toggleShowOwnMode>
type SetRangeValuesType = ReturnType<typeof setRangeValues>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetSearchValueType = ReturnType<typeof setSearchValue>
export type CardPacksActionsType =
    SetCardPacksDataType
    | ToggleUpdatedFlagType
    | SetCurrentPageType
    | SetSearchValueType
    | ToggleShowOwnModeType
    | SetRangeValuesType

// variables
const cardpacksActionVariables = {
    SET_CARDPACKS_DATA: "CARDPACKS/SET-CARDPACKS-DATA",
    TOGGLE_UPDATED_FLAG: "CARDPACKS/TOGGLE-UPDATED-FLAG",
    SET_CURRENT_PAGE: "CARDPACKS/SET-CURRENT-PAGE",
    SET_PAGINATION_OFFSET: "CARDPACKS/SET-PAGINATION-OFFSET",
    SET_SEARCH_VALUE: "CARDPACKS/SET-SEARCH-VALUE",
    TOGGLE_SHOW_OWN_MODE: "CARDPACKS/TOGGLE-SHOW-OWN-PACKS-MODE",
    SET_RANGE_VALUES: "CARDPACKS/SET_RANGE_VALUES",
    DELETE_CARDPACK: "CARDPACKS/DELETE-CARDPACK",
    EDIT_CARDPACK: "CARDPACKS/EDIT-CARDPACK",
}