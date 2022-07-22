import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { getContactHandler } from '../../lib/queries/getContact/getContact.handlers'
import { mswServer } from '../../mocks/mswServer'

import { ContactForm } from './ContactForm'

describe('AddContact', () => {
  it('adds a contact', async () => {
    // let testLocation: Location | undefined
    const queryClient = new QueryClient()
    const onSubmit = jest.fn()
    // mswServer.use(getContactHandler)
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm onSubmit={onSubmit} />
      </QueryClientProvider>
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'First Name' }), {
      target: { value: 'test' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last Name' }), {
      target: { value: 'test' }
    })
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Gender' }))
    await waitFor(() => expect(fireEvent.click(screen.getByText('Male'))))
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone Number' }), {
      target: { value: '0000000000' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
  })

  it('shows error', async () => {
    const queryClient = new QueryClient()
    const onSubmit = jest.fn()
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm onSubmit={onSubmit} />
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
