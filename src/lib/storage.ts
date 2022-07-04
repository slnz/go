export function getToken() {
  const token = window.localStorage.getItem('token')
  return token != null ? JSON.parse(token) : undefined
}

export function setToken(token: object) {
  window.localStorage.setItem('token', JSON.stringify(token))
}

export function clearToken() {
  window.localStorage.removeItem('token')
}

export default { getToken, setToken, clearToken }
