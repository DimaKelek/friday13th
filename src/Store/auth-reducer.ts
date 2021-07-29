import {authAPI, LoginDataType, UserDataType} from '../Api/authAPI';
import {AppThunk} from './store';
import {setAppStatus, setInitialized} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Feature/Authorization/AuthCommon/utils/errorHandler";

const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'LOGIN/SET_USER_DATA':
            return {...state, userData: action.userData}
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:return state
    }
}

// actions

export const setUserData = (userData: UserDataType | null) =>
    ({type: 'LOGIN/SET_USER_DATA', userData} as const)
export const setIsLoggedIn = (value: boolean) =>
    ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)

// thunks

export const login = (data: LoginDataType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.login(data)
        dispatch(setUserData(response.data))
        dispatch(me())
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const logout = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.logout()
        dispatch(setIsLoggedIn(false))
        dispatch(setUserData(null))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const me = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.me()
        dispatch(setUserData(response.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setInitialized())
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setInitialized())
    }
}

// types
type AuthStateType = typeof initialState
export type AuthActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setIsLoggedIn>