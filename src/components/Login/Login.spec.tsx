import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { waitForIonicReact } from '@ionic/react-test-utils'
import { Login } from '.'
import { useAuth } from '../../lib/useAuth'
import { AuthContextType } from '../../lib/useAuth/useAuth'

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
    const { getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    await waitForIonicReact()
    fireEvent.change(getByRole('textbox', { name: 'Email' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(getByRole('button', { name: 'toggle password visibility' }))
    await waitFor(() => getByRole('textbox', { name: 'Password' }))
    fireEvent.change(getByRole('textbox', { name: 'Password' }), {
      target: { value: 'password' }
    })
    fireEvent.click(getByRole('button', { name: 'Login' }))
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
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    await waitForIonicReact()
    fireEvent.click(getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(getByText('Email is required')).toBeInTheDocument()
    })
    expect(getByText('Password is required')).toBeInTheDocument()
    fireEvent.change(getByRole('textbox', { name: 'Email' }), {
      target: { value: 'email' }
    })
    await waitFor(() => {
      expect(getByText('Enter a valid email')).toBeInTheDocument()
    })
    fireEvent.change(getByRole('textbox', { name: 'Email' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(getByRole('button', { name: 'toggle password visibility' }))
    await waitFor(() => getByRole('textbox', { name: 'Password' }))
    fireEvent.change(getByRole('textbox', { name: 'Password' }), {
      target: { value: 'password' }
    })
    await waitFor(() =>
      expect(getByRole('button', { name: 'Login' })).not.toBeDisabled()
    )
    fireEvent.click(getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: 'email@example.com',
        password: 'password'
      })
    })
    expect(getByText('network error')).toBeInTheDocument()
  })
})
