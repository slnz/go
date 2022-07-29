import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { MemoryRouter } from 'react-router'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { mswServer } from '../../mocks/mswServer'

import { AddContactButton } from '.'

describe('AddContactButton', () => {
  it('dialog shows up', () => {
    mswServer.use(getRealmSelectableHandler(), createContactHandler())

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
