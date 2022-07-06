import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import { client } from '../fluro'
import { AuthProvider, useAuth } from './useAuth'
import { Location } from 'history'

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
      errorMessage: (error: Error) => error.message
    }
  }
}))

const mockedGetCurrentUser = client.auth.getCurrentUser as jest.Mock
const mockedLogin = client.auth.login as jest.Mock
const mockedSignup = client.auth.signup as jest.Mock
const mockedLogout = client.auth.logout as jest.Mock

describe('useAuth', () => {
  describe('login', () => {
    function Login() {
      const { login, loading, error, user } = useAuth()

      return (
        <>
          <div>{user?.firstName}</div>
          <div>{error?.message}</div>
          <button
            onClick={async () => {
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
      const { getByRole } = render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogin.mockReturnValue(new Promise(() => {}))
      fireEvent.click(getByRole('button', { name: 'Login' }))
      expect(getByRole('button', { name: 'Login' })).toBeDisabled()
    })

    it('handles error', async () => {
      const { getByRole, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogin.mockRejectedValue(new Error('network error'))
      fireEvent.click(getByRole('button', { name: 'Login' }))
      await waitFor(() =>
        expect(getByText('network error')).toBeInTheDocument()
      )
      expect(getByRole('button', { name: 'Login' })).not.toBeDisabled()
    })

    it('handles login', async () => {
      let testLocation: Location | undefined
      const { getByRole, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
            <Route
              path="*"
              render={({ location }) => {
                testLocation = location
                return null
              }}
            />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogin.mockResolvedValue({ data: { firstName: 'Sarah' } })
      fireEvent.click(getByRole('button', { name: 'Login' }))
      await waitFor(() => expect(getByText('Sarah')).toBeInTheDocument())
      expect(getByRole('button', { name: 'Login' })).not.toBeDisabled()
      expect(testLocation?.pathname).toEqual('/')
    })
  })

  describe('signup', () => {
    function Signup() {
      const { signup, loading, error, user } = useAuth()

      return (
        <>
          <div>{user?.firstName}</div>
          <div>{error?.message}</div>
          <button
            onClick={async () => {
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
      const { getByRole } = render(
        <MemoryRouter>
          <AuthProvider>
            <Signup />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedSignup.mockReturnValue(new Promise(() => {}))
      fireEvent.click(getByRole('button', { name: 'Signup' }))
      expect(getByRole('button', { name: 'Signup' })).toBeDisabled()
    })

    it('handles error', async () => {
      const { getByRole, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <Signup />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedSignup.mockRejectedValue(new Error('network error'))
      fireEvent.click(getByRole('button', { name: 'Signup' }))
      await waitFor(() =>
        expect(getByText('network error')).toBeInTheDocument()
      )
      expect(getByRole('button', { name: 'Signup' })).not.toBeDisabled()
    })

    it('handles signup', async () => {
      let testLocation: Location | undefined
      const { getByRole, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <Signup />
            <Route
              path="*"
              render={({ location }) => {
                testLocation = location
                return null
              }}
            />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedSignup.mockResolvedValue({ data: { firstName: 'Sarah' } })
      fireEvent.click(getByRole('button', { name: 'Signup' }))
      await waitFor(() => expect(getByText('Sarah')).toBeInTheDocument())
      expect(getByRole('button', { name: 'Signup' })).not.toBeDisabled()
      expect(testLocation?.pathname).toEqual('/')
    })
  })

  describe('logout', () => {
    function Logout() {
      const { logout, loading, error, user } = useAuth()

      return (
        <>
          <div>{user?.firstName}</div>
          <div>{error?.message}</div>
          <button onClick={() => logout()} disabled={loading}>
            Logout
          </button>
        </>
      )
    }
    it('starts loading', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogout.mockReturnValue(new Promise(() => {}))
      fireEvent.click(getByRole('button', { name: 'Logout' }))
      expect(getByRole('button', { name: 'Logout' })).toBeDisabled()
    })

    it('handles error', async () => {
      const { getByRole, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <Logout />
          </AuthProvider>
        </MemoryRouter>
      )
      mockedLogout.mockRejectedValue(new Error('network error'))
      fireEvent.click(getByRole('button', { name: 'Logout' }))
      await waitFor(() =>
        expect(getByText('network error')).toBeInTheDocument()
      )
      expect(getByRole('button', { name: 'Logout' })).not.toBeDisabled()
    })

    it('handles logout', async () => {
      let testLocation: Location | undefined
      mockedGetCurrentUser.mockReturnValue({ firstName: 'Sarah' })
      const { getByRole, getByText, queryByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <Logout />
            <Route
              path="*"
              render={({ location }) => {
                testLocation = location
                return null
              }}
            />
          </AuthProvider>
        </MemoryRouter>
      )
      expect(getByText('Sarah')).toBeInTheDocument()
      mockedLogout.mockResolvedValue(undefined)
      fireEvent.click(getByRole('button', { name: 'Logout' }))
      await waitFor(() => expect(queryByText('Sarah')).not.toBeInTheDocument())
      expect(getByRole('button', { name: 'Logout' })).not.toBeDisabled()
      expect(testLocation?.pathname).toEqual('/')
    })
  })
})
