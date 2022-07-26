import { fireEvent, render, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter, Route } from 'react-router'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { mswServer } from '../../mocks/mswServer'

import { AddContactButton } from '.'

describe('AddContactButton', () => {
  it('navigates to add contact page', () => {
    mswServer.use(createContactHandler())

    const queryClient = new QueryClient()
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <AddContactButton />
          </SnackbarProvider>
        </QueryClientProvider>
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'add' }))
    expect(
      screen.getByRole('textbox', { name: 'First Name' })
    ).toBeInTheDocument()
  })
})
