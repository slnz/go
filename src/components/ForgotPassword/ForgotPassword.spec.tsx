import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Location } from 'history'
import { MemoryRouter, Route } from 'react-router'

import { client } from '../../lib/fluro'

import { ForgotPassword } from '.'

jest.mock('../../lib/fluro')

const mockClient = client as jest.MockedObject<typeof client>

describe('ForgotPassword', () => {
  it('sends the user instructions to reset', async () => {
    let testLocation: Location | undefined
    const sendResetPasswordRequest = jest.fn()
    sendResetPasswordRequest.mockResolvedValue(undefined)
    mockClient.auth.sendResetPasswordRequest = sendResetPasswordRequest
    render(
      <MemoryRouter initialEntries={['/', '/forgot-password']} initialIndex={1}>
        <ForgotPassword />
        <Route
          path="*"
          render={({ location }): null => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Send Instructions' }))
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
    mockClient.utils.errorMessage = (error): string => error.message
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(
      screen.getByRole('button', { name: 'Send Instructions' })
    ).toBeDisabled()
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email' }
    })
    await waitFor(() => {
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Send Instructions' })
      ).not.toBeDisabled()
    )
    fireEvent.click(screen.getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(sendResetPasswordRequest).toHaveBeenCalledWith({
        username: 'email@example.com'
      })
    })
    expect(screen.getByText('network error')).toBeInTheDocument()
  })

  it('shows api errors', async () => {
    const sendResetPasswordRequest = jest.fn()
    sendResetPasswordRequest.mockRejectedValueOnce({
      response: { data: { error: 'account does not exist' } }
    })
    mockClient.auth.sendResetPasswordRequest = sendResetPasswordRequest
    mockClient.utils.errorMessage = (error): string => error.message
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Send Instructions' }))
    await waitFor(() => {
      expect(sendResetPasswordRequest).toHaveBeenCalledWith({
        username: 'email@example.com'
      })
    })
    expect(screen.getByText('account does not exist')).toBeInTheDocument()
  })
})
