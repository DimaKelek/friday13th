import {SignupFormDataType} from "../Components/Feature/Authorization/Registration/Registration";
import {RegisterAPI} from "../Api/register-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../Components/Feature/Authorization/AuthCommon/utils/errorHandler";
import {setAppStatus} from "./app-reducer";

const initialState = {
    register: false
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-STATUS':
            return {...state, register: action.status}
        default:
            return state
    }
}

// actions
export const setRegistrationStatus = (status: boolean) =>
    ({type: 'REGISTRATION/SET-STATUS', status} as const)

// thunks
export const signup = (formData: SignupFormDataType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        await RegisterAPI.signup(formData)
        dispatch(setRegistrationStatus(true))
        dispatch(setAppStatus('succeeded'))
    }
    catch (e) {
       handleServerNetworkError(e, dispatch)
    }
}
// types
type RegistrationStateType = typeof initialState
export type RegistrationActionsType = ReturnType<typeof setRegistrationStatus>