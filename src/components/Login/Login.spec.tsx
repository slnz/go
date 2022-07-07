import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Location } from 'history'
import { MemoryRouter, Route } from 'react-router'

import { useAuth } from '../../lib/useAuth'
import { AuthContextType } from '../../lib/useAuth/useAuth'

import { Login } from '.'

jest.mock('../../lib/useAuth', () => ({
  __esModule: true,
  useAuth: jest.fn()
}))

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('Login', () => {
  it('logs the user in', async () => {
    const login = jest.fn()
    login.mockResolvedValue(undefined)
    mockUseAuth.mockReturnValue({ login } as unknown as AuthContextType)
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'toggle password visibility' })
    )
    await screen.findByRole('textbox', { name: 'Password' })
    fireEvent.change(screen.getByRole('textbox', { name: 'Password' }), {
      target: { value: 'password' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: 'email@example.com',
        password: 'password'
      })
    })
  })

  it('shows errors', async () => {
    const login = jest.fn()
    login.mockRejectedValue(new Error('network error'))
    mockUseAuth.mockReturnValue({ login } as unknown as AuthContextType)
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(screen.getByText('Password is required')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email' }
    })
    await waitFor(() => {
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'toggle password visibility' })
    )
    await screen.findByRole('textbox', { name: 'Password' })
    fireEvent.change(screen.getByRole('textbox', { name: 'Password' }), {
      target: { value: 'password' }
    })
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Login' })).not.toBeDisabled()
    )
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: 'email@example.com',
        password: 'password'
      })
    })
    expect(screen.getByText('network error')).toBeInTheDocument()
  })

  it('navigates to forgot password', () => {
    const login = jest.fn()
    mockUseAuth.mockReturnValue({ login } as unknown as AuthContextType)
    let testLocation: Location | undefined
    render(
      <MemoryRouter>
        <Login />
        <Route
          path="*"
          render={({ location }): null => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('link', { name: 'Forgot Password?' }))
    expect(testLocation?.pathname).toEqual('/forgot-password')
  })

  it('shows useAuth error', () => {
    const login = jest.fn()
    mockUseAuth.mockReturnValue({
      login,
      error: new Error(
        'Login Failed. Please check your email address and password.'
      )
    } as unknown as AuthContextType)
    let testLocation: Location | undefined
    render(
      <MemoryRouter>
        <Login />
        <Route
          path="*"
          render={({ location }): null => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('link', { name: 'Forgot Password?' }))
    expect(testLocation?.pathname).toEqual('/forgot-password')
  })
})
