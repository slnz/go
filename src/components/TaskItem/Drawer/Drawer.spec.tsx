import { fireEvent, screen } from '@testing-library/react'

import {
  updateProcessHandler,
  updateProcessHandlerError
} from '../../../lib/mutations/updateProcess/updateProcess.handlers'
import { mswServer } from '../../../mocks/mswServer'
import { renderWithProviders } from '../../../tests/lib/helpers'

import { TaskItemDrawerProps } from './Drawer'

import { TaskItemDrawer } from '.'

describe('Drawer', () => {
  const process: TaskItemDrawerProps['process'] = {
    _id: 'processId',
    definition: 'initialContact',
    taskLists: [
      {
        tasks: [
          {
            status: 'incomplete',
            _id: '62bdd5054727d800240c7d86',
            name: 'Call Contact',
            required: true,
            instructions: {
              completeLabel: 'Appointment Set',
              pendingLabel: 'Call Back',
              failedLabel: 'Not interested'
            },
            postComplete: 'appointment',
            postFailed: 'approach',
            postPending: 'comment',
            created: '2022-06-30T16:53:25.224Z'
          }
        ],
        state: 'step_1',
        title: 'Call tasks'
      }
    ]
  }
  it('triggers close and renders success snackbar', async () => {
    mswServer.use(updateProcessHandler())
    const onClose = jest.fn()
    renderWithProviders(
      <TaskItemDrawer
        process={process}
        taskList={process.taskLists[0]}
        task={process.taskLists[0].tasks[0]}
        onClose={onClose}
        open={true}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Appointment Set' }))
    expect(onClose).toHaveBeenCalled()
    await screen.findByText('Faith step updated successfully!')
  })

  it('triggers close and renders error snackbar', async () => {
    mswServer.use(updateProcessHandlerError())
    const onClose = jest.fn()
    renderWithProviders(
      <TaskItemDrawer
        process={process}
        taskList={process.taskLists[0]}
        task={process.taskLists[0].tasks[0]}
        onClose={onClose}
        open={true}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Appointment Set' }))
    expect(onClose).toHaveBeenCalled()
    await screen.findByText('Failed to update faith step. Please try again!')
  })
})
