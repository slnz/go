import { fireEvent, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { createContentHandler } from '../../lib/mutations/createContent/createContent.handlers'
import { getProcessDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { AuthProvider } from '../../lib/useAuth'
import { mswServer } from '../../mocks/mswServer'
import { renderWithProviders } from '../../tests/lib/helpers'

import { AddProcessButton } from '.'

describe('AddProcessButton', () => {
  const user = {
    _id: 'id',
    name: 'userName',
    email: 'myEmail@gmail.com',
    firstName: '',
    lastName: '',
    accountType: '',
    verified: true,
    persona: 'person',
    account: {
      _id: '',
      title: '',
      color: ''
    },
    permissionSets: {},
    contacts: ['userId']
  }

  it('submits add process form', async () => {
    mswServer.use(
      getProcessDefinitionsHandler(),
      getRealmSelectableHandler(),
      createContentHandler()
    )
    const onSubmit = jest.fn()
    renderWithProviders(
      <MemoryRouter>
        <AuthProvider initialUser={user}>
          <AddProcessButton
            itemId="contactId"
            itemType="contact"
            onSubmit={onSubmit}
          />
        </AuthProvider>
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Add Process' }))
    fireEvent.mouseDown(await screen.findByRole('button', { name: 'Realm ​' }))
    fireEvent.click(await screen.findByText('Tandem Ministries'))
    fireEvent.click(screen.getByRole('button', { name: 'Select' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Connect Lead' }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Select' })).not.toBeDisabled()
    )
    fireEvent.click(screen.getByRole('button', { name: 'Select' }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
  })
})
