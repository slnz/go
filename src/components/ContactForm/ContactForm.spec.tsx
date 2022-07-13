import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ContactForm } from '.'

describe('AddContact', () => {
  it('adds a contact', async () => {
    // let testLocation: Location | undefined
    const onSubmit = jest.fn()
    render(<ContactForm onSubmit={onSubmit} />)
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
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Process' }))
    await waitFor(() => expect(fireEvent.click(screen.getByText('Ten'))))
    fireEvent.click(screen.getByRole('button', { name: 'Add Contact' }))
  })
})
