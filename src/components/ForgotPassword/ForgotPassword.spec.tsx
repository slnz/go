import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import { ForgotPassword } from '.'
import { client } from '../../lib/fluro'
import { Location } from 'history'

jest.mock('../../lib/fluro')

const mockClient = client as jest.MockedObject<typeof client>

describe('ForgotPassword', () => {
  it('sends the user instructions to reset', async () => {
    let testLocation: Location | undefined
    const sendResetPasswordRequest = jest.fn()
    sendResetPasswordRequest.mockResolvedValue(undefined)
    mockClient.auth.sendResetPasswordRequest = sendResetPasswordRequest
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/', '/forgot-password']} initialIndex={1}>
        <ForgotPassword />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )
    fireEvent.change(getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(sendResetPasswordRequest).toHaveBeenCalledWith({
        username: 'email@example.com'
      })
    })
    expect(testLocation?.pathname).toEqual('/')
  })

  it('shows form and network errors', async () => {
    const sendResetPasswordRequest = jest.fn()
    sendResetPasswordRequest.mockRejectedValueOnce(new Error('network error'))
    mockClient.auth.sendResetPasswordRequest = sendResetPasswordRequest
    mockClient.utils.errorMessage = (error) => error.message
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    )
    fireEvent.click(getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(getByText('Email is required')).toBeInTheDocument()
    })
    expect(getByRole('button', { name: 'Send Instructions' })).toBeDisabled()
    fireEvent.change(getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email' }
    })
    await waitFor(() => {
      expect(getByText('Enter a valid email')).toBeInTheDocument()
    })
    fireEvent.change(getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    await waitFor(() =>
      expect(
        getByRole('button', { name: 'Send Instructions' })
      ).not.toBeDisabled()
    )
    fireEvent.click(getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(sendResetPasswordRequest).toHaveBeenCalledWith({
        username: 'email@example.com'
      })
    })
    expect(getByText('network error')).toBeInTheDocument()
  })

  it('shows api errors', async () => {
    const sendResetPasswordRequest = jest.fn()
    sendResetPasswordRequest.mockRejectedValueOnce({
      response: { data: { error: 'account does not exist' } }
    })
    mockClient.auth.sendResetPasswordRequest = sendResetPasswordRequest
    mockClient.utils.errorMessage = (error) => error.message
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    )
    fireEvent.change(getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(sendResetPasswordRequest).toHaveBeenCalledWith({
        username: 'email@example.com'
      })
    })
    expect(getByText('account does not exist')).toBeInTheDocument()
  })
})
