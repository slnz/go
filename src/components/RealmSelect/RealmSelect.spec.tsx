import { fireEvent, screen } from '@testing-library/react'

import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { mswServer } from '../../mocks/mswServer'
import { renderWithProviders } from '../../tests/lib/helpers'

import { RealmSelect } from '.'

describe('RealmSelect', () => {
  it('calls on change when saved', async () => {
    mswServer.use(getRealmSelectableHandler())
    const onChange = jest.fn()
    renderWithProviders(<RealmSelect onChange={onChange} value={[]} />)
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Realm ​' }))
    const element = await screen.findByText('Tandem Ministries')
    fireEvent.click(element)
    fireEvent.click(screen.getByRole('tab', { name: 'Staff Teams' }))
    fireEvent.click(screen.getByText('Auckland Staff Team'))
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onChange).toHaveBeenCalledWith(['realmId1', 'realmId13'])
  })

  it('does not call on change when cancelled', async () => {
    mswServer.use(getRealmSelectableHandler())
    const onChange = jest.fn()
    renderWithProviders(<RealmSelect onChange={onChange} value={[]} />)
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Realm ​' }))
    const element = await screen.findByText('Tandem Ministries')
    fireEvent.click(element)
    fireEvent.click(screen.getByRole('tab', { name: 'Staff Teams' }))
    fireEvent.click(screen.getByText('Auckland Staff Team'))
    fireEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(onChange).not.toHaveBeenCalled()
  })
})
