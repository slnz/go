import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { mswServer } from '../../mocks/mswServer'

import { AddContact } from '.'

describe('AddContact', () => {
  it('creates a contact', async () => {
    mswServer.use(createContactHandler())
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <SnackbarProvider>
          <AddContact />
        </SnackbarProvider>
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
      expect(screen.getByRole('alert')).toHaveTextContent('Contact Created')
    })
  })
})
