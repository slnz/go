import { fireEvent, screen, waitFor } from '@testing-library/react'

import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { mswServer } from '../../mocks/mswServer'
import { renderWithProviders } from '../../tests/lib/helpers'

import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('adds a contact', async () => {
    mswServer.use(getRealmSelectableHandler())
    const onSubmit = jest.fn()
    renderWithProviders(
      <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
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
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'test',
        lastName: 'test',
        gender: 'male',
        phone: '0000000000',
        email: 'email@example.com',
        realms: ['realmId1', 'realmId13']
      })
    })
  })

  it('shows error for required fields', async () => {
    mswServer.use(getRealmSelectableHandler())
    const onSubmit = jest.fn()

    renderWithProviders(
      <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Add Contact' }))
    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument()
    })
    expect(screen.getByText('Gender is required')).toBeInTheDocument()
    expect(screen.getByText('Phone or email is required')).toBeInTheDocument()
    expect(screen.getByText('Email or phone is required')).toBeInTheDocument()
    expect(screen.getByText('Realm is required')).toBeInTheDocument()
  })
})

it('shows eror when realm is not selected', async () => {
  mswServer.use(getRealmSelectableHandler())

  const onSubmit = jest.fn()

  renderWithProviders(
    <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
  )
  fireEvent.mouseDown(await screen.findByRole('button', { name: 'Realm ​' }))
  fireEvent.click(screen.getByRole('button', { name: 'close' }))
  await waitFor(() => {
    expect(screen.getByText('Realm is required')).toBeInTheDocument()
  })
})
