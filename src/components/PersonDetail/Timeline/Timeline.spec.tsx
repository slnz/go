import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getContactTimelineHandler } from '../../../lib/queries/getContactTimeline/getContactTimeline.handlers'
import { mswServer } from '../../../mocks/mswServer'

import { PersonDetailTimeline } from '.'

describe('PersonDetailTimeline', () => {
  it('shows contact timeline', async () => {
    mswServer.use(getContactTimelineHandler())
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <PersonDetailTimeline id="personId" />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Brian Chen posted a Comment' })
      ).toBeInTheDocument()
    })
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Filter' }))
    fireEvent.click(screen.getByRole('option', { name: 'All' }))
    expect(screen.getByText('Created contact')).toBeInTheDocument()
  })
})
