/** 统一处理 token */
const key = 'token'

export const getToken = () => {
  return localStorage.getItem(key)
}

export const setToken = (token: string) => {
  return localStorage.setItem(key, token)
}

export const removeToken = () => {
  return localStorage.removeItem(key)
}
