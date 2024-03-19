import cookie from 'js-cookie'

const TokenKey = 'Admin-Token'

/**
 * 获取token
 * @returns
 */
export const getToken = () => cookie.get(TokenKey)

/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token: string) => cookie.set(TokenKey, token)

/**
 * 删除token
 * @returns
 */
export const removeToken = () => cookie.remove(TokenKey)
