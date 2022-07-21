import { fireEvent, screen } from '@testing-library/react'

import { client } from '../../lib/fluro'
import { updateProcessHandler } from '../../lib/mutations/updateProcess/updateProcess.handlers'
import { getProcessHandler } from '../../lib/queries/getProcess/getProcess.handlers'
import { mswServer } from '../../mocks/mswServer'
import { renderWithProviders } from '../../tests/lib/helpers'

import { ProcessDetail } from '.'

describe('ProcessDetail', () => {
  it('optimistic state change', async () => {
    mswServer.use(getProcessHandler())
    renderWithProviders(<ProcessDetail id="processId" />)
    fireEvent.mouseDown(
      await screen.findByRole('button', { name: 'Current State Call' })
    )
    fireEvent.click(screen.getByRole('option', { name: 'Appointment Set' }))
    await screen.findByRole('button', { name: 'Current State Appointment Set' })
  })

  it('server-side state change', async () => {
    mswServer.use(getProcessHandler(), updateProcessHandler())
    renderWithProviders(<ProcessDetail id="processId" />)
    fireEvent.mouseDown(
      await screen.findByRole('button', { name: 'Current State Call' })
    )
    client.cache.reset()
    mswServer.use(getProcessHandler({ state: 'step_2' }))
    fireEvent.click(screen.getByRole('option', { name: 'Appointment Set' }))
    await screen.findByRole('button', { name: 'Current State Appointment Set' })
  })
})
