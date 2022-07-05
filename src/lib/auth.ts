import { LoginRequest, User } from 'fluro'
import { initReactQueryAuth } from 'react-query-auth'
import { client } from './fluro'

async function loadUser(): Promise<User | undefined> {
  try {
    console.log(client.auth.getCurrentUser())
    return await client.auth.getCurrentUser()
  } catch (err) {
    throw new Error(client.utils.errorMessage(err))
  }
}

async function loginFn(request: LoginRequest): Promise<User> {
  try {
    const response = await client.auth.login(request)
    return response.data
  } catch (err) {
    throw new Error(client.utils.errorMessage(err))
  }
}

async function logoutFn(): Promise<void> {
  try {
    return await client.auth.logout()
  } catch (err) {
    throw new Error(client.utils.errorMessage(err))
  }
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
