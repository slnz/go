import { getToken } from '../storage'
import { handleApiResponse } from './util'

interface Account {
  _id: string
  title: string
  color: string
}

interface PermissionSet {
  permissions: string[]
  _id: string
  title: string
}

export interface User {
  _id: string
  name: string
  email: string
  firstName: string
  lastName: string
  accountType: string
  verified: boolean
  account: Account
  permissionSets: { [key: string]: PermissionSet }
}

export async function getCurrentUserSession(): Promise<User> {
  const response = await fetch('https://api.fluro.io/session', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return handleApiResponse(response)
}

export interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse extends User {
  token: string
  expires: Date
  refreshToken: string
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(' https://api.fluro.io/token/login', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return handleApiResponse(response)
}
