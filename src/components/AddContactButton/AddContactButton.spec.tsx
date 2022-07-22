import { fireEvent, render, screen } from '@testing-library/react'
import { Location } from 'history'
import { MemoryRouter, Route } from 'react-router'

import { AddContactButton } from '.'

describe('AddContactButton', () => {
  it('navigates to add contact page', () => {
    let testLocation: Location | undefined
    render(
      <MemoryRouter>
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
    fireEvent.click(screen.getByRole('link', { name: 'add' }))
    expect(testLocation?.pathname).toEqual('/tabs/people/add')
  })
})
