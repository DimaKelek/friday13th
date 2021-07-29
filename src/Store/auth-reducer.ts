import {authAPI, LoginDataType, UserDataType} from '../Api/authAPI';
import {Dispatch} from 'redux';
import {AppThunk} from './store';


const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'LOGIN/SET_USER_DATA':
            return {
                ...state, userData: action.userData
            }
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state
    }
}

// actions

export const setUserData = (userData: UserDataType | null) =>
    ({type: 'LOGIN/SET_USER_DATA', userData} as const)

export const setIsLoggedIn = (value: boolean) =>
    ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)

// thunks

export const login = (data: LoginDataType): AppThunk => async (dispatch: Dispatch<AuthActionsType>) => {
    try {
        const response = await authAPI.login(data)
        dispatch(setUserData(response.data))
        dispatch(setIsLoggedIn(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        console.log(error)
    }
}

export const logout = (): AppThunk => async (dispatch: Dispatch<AuthActionsType>) => {
    try {
        await authAPI.logout()
        dispatch(setIsLoggedIn(false))
        dispatch(setUserData(null))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        console.log(error)
    }
}

export const me = (): AppThunk => async (dispatch: Dispatch<AuthActionsType>) => {
    try {
        const response = await authAPI.me()
        dispatch(setIsLoggedIn(true))
        dispatch(setUserData(response.data))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        console.log(error)
    }
}

// types
type AuthStateType = typeof initialState
export type AuthActionsType = ReturnType<typeof setUserData>
    | ReturnType<typeof setIsLoggedIn>