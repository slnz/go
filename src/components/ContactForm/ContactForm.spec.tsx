import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ContactForm } from './ContactForm'

describe('AddContact', () => {
  it('adds a contact', async () => {
    const queryClient = new QueryClient()
    const onSubmit = jest.fn()
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
      </QueryClientProvider>
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'First Name' }), {
      target: { value: 'test' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last Name' }), {
      target: { value: 'test' }
    })
    fireEvent.mouseDown(screen.getByRole('button', { name: /gender/i }))

    fireEvent.click(screen.getByRole('option', { name: 'Male' }))

    fireEvent.change(screen.getByRole('textbox', { name: 'Phone Number' }), {
      target: { value: '0000000000' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Contact' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'test',
        lastName: 'test',
        gender: 'male',
        phone: '0000000000',
        email: 'email@example.com'
      })
    })
  })

  it('shows error for required fields', async () => {
    const queryClient = new QueryClient()
    const onSubmit = jest.fn()
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
      </QueryClientProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Add Contact' }))
    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument()
    })
    expect(screen.getByText('Phone or email is required')).toBeInTheDocument()
    expect(screen.getByText('Email or phone is required')).toBeInTheDocument()
  })
})
