import { initReactQueryAuth } from 'react-query-auth'
import { login, getCurrentUserSession, LoginRequest, User } from './fluro'
import { setToken, clearToken, getToken } from './storage'

async function loadUser(): Promise<User | undefined> {
  if (getToken()) {
    return await getCurrentUserSession()
  }
}

async function loginFn(data: LoginRequest): Promise<User> {
  const user = await login(data)
  const { token, expires, refreshToken } = user
  setToken({ token, expires, refreshToken })
  return user
}

async function logoutFn() {
  await clearToken()
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn: async () => {
    return undefined as unknown as User
  },
  logoutFn
}

const { AuthProvider, AuthConsumer, useAuth } = initReactQueryAuth<
  User | undefined,
  Error,
  LoginRequest
>(authConfig)

export { AuthProvider, AuthConsumer, useAuth }
