import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { client } from '../../lib/fluro'
import { updateProcessHandler } from '../../lib/mutations/updateProcess/updateProcess.handlers'
import { getProcessHandler } from '../../lib/queries/getProcess/getProcess.handlers'
import { mswServer } from '../../mocks/mswServer'

import { ProcessDetail } from '.'

describe('ProcessDetail', () => {
  it('optimistic state change', async () => {
    mswServer.use(getProcessHandler())
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <ProcessDetail id="processId" />
      </QueryClientProvider>
    )
    fireEvent.mouseDown(
      await screen.findByRole('button', { name: 'Current State Call' })
    )
    fireEvent.click(screen.getByRole('option', { name: 'Appointment Set' }))
    await screen.findByRole('button', { name: 'Current State Appointment Set' })
  })

  it('server-side state change', async () => {
    mswServer.use(getProcessHandler(), updateProcessHandler())
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <ProcessDetail id="processId" />
      </QueryClientProvider>
    )
    fireEvent.mouseDown(
      await screen.findByRole('button', { name: 'Current State Call' })
    )
    client.cache.reset()
    mswServer.use(getProcessHandler({ state: 'step_2' }))
    fireEvent.click(screen.getByRole('option', { name: 'Appointment Set' }))
    await screen.findByRole('button', { name: 'Current State Appointment Set' })
  })
})
