import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { getContactHandler } from '../../../lib/queries/getContact/getContact.handlers'
import { mswServer } from '../../../mocks/mswServer'

import { PersonDetailInfo } from '.'

describe('PersonDetailInfo', () => {
  it('shows contact details', async () => {
    mswServer.use(
      getContactHandler({
        firstName: 'Bob',
        lastName: 'Jones',
        phoneNumbers: ['021098765', '022789654'],
        emails: ['bob.jones@example.com', 'bobs.work@example.com']
      })
    )
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <PersonDetailInfo id="personId" />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByRole('link', { name: '021098765' })).toHaveAttribute(
        'href',
        'tel:021098765'
      )
    })
    expect(screen.getByRole('link', { name: '022789654' })).toHaveAttribute(
      'href',
      'tel:022789654'
    )
    expect(
      screen.getByRole('link', { name: 'bob.jones@example.com' })
    ).toHaveAttribute('href', 'mailto:bob.jones@example.com')
    expect(
      screen.getByRole('link', { name: 'bobs.work@example.com' })
    ).toHaveAttribute('href', 'mailto:bobs.work@example.com')
  })
})
