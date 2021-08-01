import axios from "axios";
import {ForgotPasswordRequest, RecoveryRequestType} from "../Store/recovery-pass-reducer";

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

export const authAPI = {
    forgot(data: ForgotPasswordRequest) {
        return instance.post<ResponseType>(`/auth/forgot`, data)
    },
    recoveryPass(data: RecoveryRequestType) {
        return instance.post<ResponseType>(`/auth/set-new-password`, data)
    }
}

type ResponseType = {
    info?: string
    error?: string
}