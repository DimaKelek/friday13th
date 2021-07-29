import {Dispatch} from "redux";
import {SignupFormDataType} from "../Components/Feature/Authorization/Registration/Registration";
import {AuthRegisterResponseType, RegisterAPI} from "../Api/register-api";
import {AxiosResponse} from "axios";

export type TRegistrationStatus = 'Registring...' | 'Idle' | 'Succeeded!' | 'Failed!'

const initialState = {
    registrationStatus: 'Idle' as TRegistrationStatus,
    registrationFormError: '',
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-STATUS':
            return {...state, ...action.payload}
        case 'REGISTRATION/SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
}

// actions

export const setRegistrationStatus = (status: TRegistrationStatus) => {
    return { type: 'REGISTRATION/SET-STATUS', payload: {registrationStatus: status}} as const
}

export const setRegistrationFormError = (error: string) => {
    return { type: 'REGISTRATION/SET-ERROR', payload: {registrationFormError: error}} as const
}

// thunks
export const signup = (formData: SignupFormDataType) => async (dispatch: Dispatch) => {
    dispatch(setRegistrationStatus('Registring...'))
    try {
        const response: AxiosResponse<AuthRegisterResponseType> = await RegisterAPI.signup(formData)
        if (response.data.error) {
            dispatch(setRegistrationFormError(response.data.error))
        }
        else dispatch(setRegistrationStatus('Succeeded!'))
    }
    catch (e) {
        dispatch(setRegistrationStatus('Failed!'))
    }
}
// types
type RegistrationStateType = typeof initialState
type SetRegistrationStatusType = ReturnType<typeof setRegistrationStatus>
type SetRegistrationFormErrorType = ReturnType<typeof setRegistrationFormError>
export type RegistrationActionsType = SetRegistrationStatusType | SetRegistrationFormErrorType