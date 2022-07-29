import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { Location } from 'history'
import { SnackbarProvider } from 'notistack'
import { MemoryRouter, Route } from 'react-router'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { mswServer } from '../../mocks/mswServer'

import { AddContact } from '.'

describe('AddContact', () => {
  it('creates a contact', async () => {
    mswServer.use(getRealmSelectableHandler(), createContactHandler())
    let testLocation: Location | undefined
    const client = new QueryClient()
    render(
      <MemoryRouter initialEntries={['/people']}>
        <QueryClientProvider client={client}>
          <SnackbarProvider>
            <AddContact />
            <Route
              path="*"
              render={({ location }): null => {
                testLocation = location
                return null
              }}
            />
          </SnackbarProvider>
        </QueryClientProvider>
      </MemoryRouter>
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
    fireEvent.mouseDown(await screen.findByRole('button', { name: 'Realm ​' }))
    const element = await screen.findByText('Tandem Ministries')
    fireEvent.click(element)
    fireEvent.click(screen.getByRole('tab', { name: 'Staff Teams' }))
    fireEvent.click(screen.getByText('Auckland Staff Team'))
    fireEvent.click(await screen.findByRole('button', { name: 'Select' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Add Contact' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Contact Created'
    )
    expect(testLocation?.pathname).toEqual('/people/newContactId')
  })
})
