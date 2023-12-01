import { http } from "@/utils/http";
import type * as Login from "./types/login"


// 获取登录验证码
export function getLoginCodeApi() {
  return http.get<Login.LoginCodeResponseData>('login/code')
}

// 登录并返回 token
export function loginApi(data: Login.LoginRequestData) {
  return http.post<Login.LoginResponseData>('users/login', data)
}

// 获取用户详情
export function getUserInfoApi() {
  return http.get<Login.UserInfoResponseData>('users/info')
}