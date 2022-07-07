import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Location } from 'history'
import { ReactElement } from 'react'
import { MemoryRouter, Route } from 'react-router'

import { client } from '../fluro'

import { AuthProvider, useAuth } from './useAuth'

jest.mock('../fluro', () => ({
  __esModule: true,
  client: {
    auth: {
      login: jest.fn(),
      signup: jest.fn(),
      getCurrentUser: jest.fn(() => undefined),
      logout: jest.fn()
    },
    utils: {
      errorMessage: (error: Error): string => error.message
    }
  }
}))

const mockedGetCurrentUser = client.auth.getCurrentUser as jest.Mock
const mockedLogin = client.auth.login as jest.Mock
const mockedSignup = client.auth.signup as jest.Mock
const mockedLogout = client.auth.logout as jest.Mock

describe('useAuth', () => {
  describe('login', () => {
    function Login(): ReactElement {
      const { login, loading, error, user } = useAuth()

      return (
        <>
          <div>{user?.firstName}</div>
          <div>{error?.message}</div>
          <button
            onClick={async (): Promise<void> => {
              try {
                await login({ username: 'username', password: 'password' })
              } catch {}
            }}
            disabled={loading}
          >
            Login
          </button>
        </>
      )
    }

    it('starts loading', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogin.mockReturnValue(new Promise(() => {}))
      fireEvent.click(screen.getByRole('button', { name: 'Login' }))
      expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
    })

    it('handles error', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogin.mockRejectedValue(new Error('network error'))
      fireEvent.click(screen.getByRole('button', { name: 'Login' }))
      await screen.findByText('network error')
      expect(screen.getByRole('button', { name: 'Login' })).not.toBeDisabled()
    })

    it('handles login', async () => {
      let testLocation: Location | undefined
      render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
            <Route
              path="*"
              render={({ location }): null => {
                testLocation = location
                return null
              }}
            />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogin.mockResolvedValue({ data: { firstName: 'Sarah' } })
      fireEvent.click(screen.getByRole('button', { name: 'Login' }))
      await screen.findByText('Sarah')
      expect(screen.getByRole('button', { name: 'Login' })).not.toBeDisabled()
      expect(testLocation?.pathname).toEqual('/')
    })
  })

  describe('signup', () => {
    function Signup(): ReactElement {
      const { signup, loading, error, user } = useAuth()

      return (
        <>
          <div>{user?.firstName}</div>
          <div>{error?.message}</div>
          <button
            onClick={async (): Promise<void> => {
              try {
                await signup({
                  username: 'username',
                  password: 'password',
                  firstName: 'firstName',
                  lastName: 'lastName'
                })
              } catch {}
            }}
            disabled={loading}
          >
            Signup
          </button>
        </>
      )
    }
    it('starts loading', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Signup />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedSignup.mockReturnValue(new Promise(() => {}))
      fireEvent.click(screen.getByRole('button', { name: 'Signup' }))
      expect(screen.getByRole('button', { name: 'Signup' })).toBeDisabled()
    })

    it('handles error', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Signup />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedSignup.mockRejectedValue(new Error('network error'))
      fireEvent.click(screen.getByRole('button', { name: 'Signup' }))
      await screen.findByText('network error')
      expect(screen.getByRole('button', { name: 'Signup' })).not.toBeDisabled()
    })

    it('handles signup', async () => {
      let testLocation: Location | undefined
      render(
        <MemoryRouter>
          <AuthProvider>
            <Signup />
            <Route
              path="*"
              render={({ location }): null => {
                testLocation = location
                return null
              }}
            />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedSignup.mockResolvedValue({ data: { firstName: 'Sarah' } })
      fireEvent.click(screen.getByRole('button', { name: 'Signup' }))
      await screen.findByText('Sarah')
      expect(screen.getByRole('button', { name: 'Signup' })).not.toBeDisabled()
      expect(testLocation?.pathname).toEqual('/')
    })
  })

  describe('logout', () => {
    function Logout(): ReactElement {
      const { logout, loading, error, user } = useAuth()

      return (
        <>
          <div>{user?.firstName}</div>
          <div>{error?.message}</div>
          <button onClick={(): Promise<void> => logout()} disabled={loading}>
            Logout
          </button>
        </>
      )
    }
    it('starts loading', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogout.mockReturnValue(new Promise(() => {}))
      fireEvent.click(screen.getByRole('button', { name: 'Logout' }))
      expect(screen.getByRole('button', { name: 'Logout' })).toBeDisabled()
    })

    it('handles error', async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogout.mockRejectedValue(new Error('network error'))
      fireEvent.click(screen.getByRole('button', { name: 'Logout' }))
      await screen.findByText('network error')
      expect(screen.getByRole('button', { name: 'Logout' })).not.toBeDisabled()
    })

    it('handles logout', async () => {
      let testLocation: Location | undefined
      mockedGetCurrentUser.mockReturnValue({ firstName: 'Sarah' })
      render(
        <MemoryRouter>
          <AuthProvider>
            <Logout />
            <Route
              path="*"
              render={({ location }): null => {
                testLocation = location
                return null
              }}
            />
          </AuthProvider>
        </MemoryRouter>
      )
      expect(screen.getByText('Sarah')).toBeInTheDocument()
      mockedLogout.mockResolvedValue(undefined)
      fireEvent.click(screen.getByRole('button', { name: 'Logout' }))
      await waitFor(() =>
        expect(screen.queryByText('Sarah')).not.toBeInTheDocument()
      )
      expect(screen.getByRole('button', { name: 'Logout' })).not.toBeDisabled()
      expect(testLocation?.pathname).toEqual('/')
    })
  })
})
