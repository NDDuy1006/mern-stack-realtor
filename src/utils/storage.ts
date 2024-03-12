const config = {
  prefix: "MY_REALTOR",
  accessToken: "ACCESS_TOKEN",
  refreshToken: "REFRESH_TOKEN",
} as const

const saveToLocalStorage = (name: string, value: unknown) => {
  if (typeof window === "undefined" || !window.localStorage) return

  localStorage.setItem(`${config.prefix}:${name}`, JSON.stringify(value))
}

const loadFromLocalStorage = (name: string) => {
  if (typeof window === "undefined" || !window.localStorage) return null

  const item = localStorage.getItem(`${config.prefix}:${name}`)
  if (item === null || item === undefined) return null
  return JSON.parse(item) as string
}

const removeFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return
  localStorage.removeItem(`${config.prefix}:${name}`)
}

export const saveAccessToken = (accessToken: string) => saveToLocalStorage(config.accessToken, accessToken)
export const loadAccessToken = () => loadFromLocalStorage(config.accessToken)
export const clearAccessToken = () => removeFromLocalStorage(config.accessToken)

export const saveRefreshToken = (refeshToken: string) =>
  saveToLocalStorage(config.refreshToken, refeshToken);
export const loadRefreshToken = () => loadFromLocalStorage(config.refreshToken)
export const clearRefreshToken = () => removeFromLocalStorage(config.refreshToken)