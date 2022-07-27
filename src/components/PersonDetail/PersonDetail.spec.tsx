import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getContactHandler } from '../../lib/queries/getContact/getContact.handlers'
import { getContactTimelineHandler } from '../../lib/queries/getContactTimeline/getContactTimeline.handlers'
import { mswServer } from '../../mocks/mswServer'

import { PersonDetail } from '.'

describe('PersonDetail', () => {
  it('shows contact details', async () => {
    mswServer.use(
      getContactHandler({
        firstName: 'Bob',
        lastName: 'Jones',
        phoneNumbers: ['021098765', '022789654'],
        emails: ['bob.jones@example.com', 'bobs.work@example.com']
      })
    )
    mswServer.use(getContactTimelineHandler())
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <PersonDetail id="personId" />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Bob' })).toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { name: 'Jones' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Call' })).toHaveAttribute(
      'href',
      'tel:021098765'
    )
    expect(screen.getByRole('tab', { name: 'Text' })).toHaveAttribute(
      'href',
      'sms:021098765'
    )
    expect(screen.getByRole('tab', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:bob.jones@example.com'
    )
    expect(screen.getByRole('tab', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:bob.jones@example.com'
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Timeline' }))
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Brian Chen posted a Comment' })
      ).toBeInTheDocument()
    })
  })
})
