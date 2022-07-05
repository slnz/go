import { LoginCredentials, SignupCredentials, User } from 'fluro'
import { initReactQueryAuth } from 'react-query-auth'
import { client } from './fluro'

async function loadUser(): Promise<User | undefined> {
  try {
    return await client.auth.getCurrentUser()
  } catch (err) {
    throw new Error(client.utils.errorMessage(err))
  }
}

async function loginFn(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await client.auth.login(credentials)
    return response.data
  } catch (err) {
    throw new Error(client.utils.errorMessage(err))
  }
}

async function registerFn(credentials: SignupCredentials): Promise<User> {
  try {
    const response = await client.auth.signup(credentials)
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
  registerFn,
  logoutFn
}

const { AuthProvider, AuthConsumer, useAuth } = initReactQueryAuth<
  User | undefined,
  Error,
  LoginCredentials
>(authConfig)

export { AuthProvider, AuthConsumer, useAuth }
