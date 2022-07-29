import { fireEvent, screen, waitFor } from '@testing-library/react'
import { Location } from 'history'
import { MemoryRouter, Route } from 'react-router'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { mswServer } from '../../mocks/mswServer'
import { renderWithProviders } from '../../tests/lib/helpers'

import { AddContactButton } from '.'

describe('AddContactButton', () => {
  it('add a contact', async () => {
    mswServer.use(getRealmSelectableHandler(), createContactHandler())
    let testLocation: Location | undefined
    renderWithProviders(
      <MemoryRouter initialEntries={['/people']}>
        <AddContactButton />
        <Route
          path="*"
          render={({ location }): null => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'add' }))
    expect(
      screen.getByRole('textbox', { name: 'First Name' })
    ).toBeInTheDocument()
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
    await waitFor(() =>
      expect(screen.queryByRole('alert', { name: 'Contact Created' }))
    )
    await waitFor(() =>
      expect(testLocation?.pathname).toEqual('/people/newContactId')
    )
  })
})
