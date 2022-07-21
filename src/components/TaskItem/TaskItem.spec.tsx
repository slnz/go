import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { TaskItem, TaskItemProps } from './TaskItem'

describe('TaskItem', () => {
  const process: TaskItemProps['process'] = {
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

  it('opens and closes the drawer', () => {
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <TaskItem
          process={process}
          taskList={process.taskLists[0]}
          task={process.taskLists[0].tasks[0]}
        />
      </QueryClientProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Call Contact' }))
    expect(screen.getByText('Appointment Set')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
  })
})
