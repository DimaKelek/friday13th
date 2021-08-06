import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})


export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<LoginResponseType>('/auth/login', data)
  },
  me() {
    return instance.post<LoginResponseType>('/auth/me', {})
  },
  logout() {
    return instance.delete<LogoutResponseType>('/auth/me', {})
  }
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserDataType = {
  _id: string
  email: string
  name: string
  avatar?: string | null
  publicCardPacksCount: number
}

type LoginResponseType = UserDataType & {
  error?: string
}

type LogoutResponseType = {
  info?: string
  error?: string
}