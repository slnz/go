import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '../../tests/lib/helpers'

import { TaskItem, TaskItemProps } from './TaskItem'

describe('TaskItem', () => {
  const process: TaskItemProps['process'] = {
    _id: 'processId',
    definition: 'initialContact',
    item: {
      _id: 'contactId',
      firstName: 'name',
      lastName: 'surname',
      _type: 'contact'
    },
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

  it('opens and closes the drawer', () => {
    renderWithProviders(
      <TaskItem
        process={process}
        taskList={process.taskLists[0]}
        task={process.taskLists[0].tasks[0]}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Call Contact' }))
    expect(screen.getByText('Appointment Set')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
  })
})
