import { defineStore } from "pinia"
import store from "@/stores"
import { getToken, removeToken, setToken } from "@/utils/cache/token"
import { ref } from "vue"
import type { LoginRequestData } from "@/api/login/types/login"
import { loginApi, getUserInfoApi } from "@/api/login"
import routeSettings from "@/config/route"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([])
  const username = ref<string>('')

  // 设置用户角色
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  // 登录
  const login = async ({ username, password, code}: LoginRequestData) => {
    const { data } = await loginApi({ username, password, code })
    setToken(data.token)
    token.value = data.token
  }

  // 获取用户详情
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
  }

  // 切换角色
  const changeRoles = async (role: string) => {
    
  }

  // 登出
  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  // 重置token
  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  return { token, roles, username, setRoles, login, getInfo, changeRoles, logout, resetToken }

})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}