export interface LoginRequestData {
  username: string
  password: string
  code: string
}

export type LoginCodeResponseData = string

export type LoginResponseData = { token: string }

export type UserInfoResponseData = { username: string; roles: string[] }
