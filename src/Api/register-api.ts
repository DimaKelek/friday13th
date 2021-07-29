import {SignupFormDataType} from "../Components/Feature/Authorization/Registration/Registration";
import axios from "axios";

const instanse = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

export type AuthRegisterResponseType = {
    addedUser: any
    error?: string
}

export const RegisterAPI = {
    signup({email, password}: SignupFormDataType) {
        return (
            instanse.post<AuthRegisterResponseType>(`auth/register`, {email, password})
        )
    },
}