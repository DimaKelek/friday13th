import {Dispatch} from "redux";
import {SignupFormDataType} from "../Components/Feature/Authorization/Registration/Registration";
import {AuthRegisterResponseType, RegisterAPI} from "../Api/register-api";
import {AxiosResponse} from "axios";

const initialState = {
    registrationStatus: false,
    registrationError: '',
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        default: return state
    }
}

// actions

const setRegistrationStatus = (status: boolean) => {
    return { type: 'REGISTRATION/SET-STATUS', payload: {registrationStatus: status}} as const
}

const setRegistrationError = (error: string) => {
    return { type: 'REGISTRATION/SET-ERROR', payload: {registrationError: error}} as const
}

// thunks
export const signup = (formData: SignupFormDataType) => async (dispatch: Dispatch) => {
    const response: AxiosResponse<AuthRegisterResponseType> = await RegisterAPI.signup(formData)
    if (response.data.error) {
        dispatch(setRegistrationError(response.data.error))
    }
    else dispatch(setRegistrationStatus(false))
}
// types
type RegistrationStateType = typeof initialState
export type RegistrationActionsType = any