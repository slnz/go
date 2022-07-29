import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { mswServer } from '../../mocks/mswServer'

import { ContactForm } from './ContactForm'

describe('AddContact', () => {
  it('adds a contact', async () => {
    mswServer.use(getRealmSelectableHandler())
    const queryClient = new QueryClient()
    const onSubmit = jest.fn()
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
      </QueryClientProvider>
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
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
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
    const queryClient = new QueryClient()
    const onSubmit = jest.fn()

    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
      </QueryClientProvider>
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
  const queryClient = new QueryClient()
  const onSubmit = jest.fn()

  render(
    <QueryClientProvider client={queryClient}>
      <ContactForm submitLabel="Add Contact" onSubmit={onSubmit} />
    </QueryClientProvider>
  )
  fireEvent.mouseDown(await screen.findByRole('button', { name: 'Realm ​' }))
  fireEvent.click(screen.getByRole('button', { name: 'close' }))
  await waitFor(() => {
    expect(screen.getByText('Realm is required')).toBeInTheDocument()
  })
})
