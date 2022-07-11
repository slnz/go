import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Location } from 'history'
import { MemoryRouter, Route } from 'react-router'

import { AddContact } from '.'

describe('AddContact', () => {
  it('adds a contact', async () => {
    // let testLocation: Location | undefined
    render(
      <MemoryRouter>
        <AddContact />
        {/* <Route
          path="*"
          render={({ location }): null => {
            testLocation = location
            return null
          }}
        /> */}
      </MemoryRouter>
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'First Name' }), {
      target: { value: 'test' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last Name' }), {
      target: { value: 'test' }
    })
    fireEvent.click(screen.getByTestId('gender'))
    await waitFor(() => expect(fireEvent.click(screen.getByText('Male'))))
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone Number' }), {
      target: { value: '0000000000' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email Address' }), {
      target: { value: 'email@example.com' }
    })
  })
})
