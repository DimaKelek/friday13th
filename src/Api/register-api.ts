import {instance} from "./api";
import {SignupFormDataType} from "../Components/Feature/Authorization/Registration/Registration";

export type AuthRegisterResponseType = {
    addedUser: any
    error?: string
}

export const RegisterAPI = {
    signup({email, password}: SignupFormDataType) {
        return (
            instance.post<AuthRegisterResponseType>(`auth/register`, {email, password})
        )
    },
}