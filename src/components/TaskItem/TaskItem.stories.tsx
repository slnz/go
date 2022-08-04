import { Story, Meta } from '@storybook/react'
import { screen, userEvent, within } from '@storybook/testing-library'

import {
  updateProcessHandler,
  updateProcessHandlerError
} from '../../lib/mutations/updateProcess/updateProcess.handlers'

import { TaskItemProps } from './TaskItem'

import { TaskItem } from '.'

const TaskItemStory = {
  title: 'Components/TaskItem',
  component: TaskItem
}

const Template: Story<TaskItemProps> = (args) => <TaskItem {...args} />

const templateProcess: TaskItemProps['process'] = {
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
          description: '<p>Call contact to set up an appointment</p>',
          postPending: 'comment',
          created: '2022-06-30T16:53:25.224Z'
        }
      ],
      state: 'step_1',
      title: 'Call tasks'
    }
  ]
}

export const Default = Template.bind({})
Default.args = {
  process: templateProcess,
  task: templateProcess.taskLists[0].tasks[0],
  taskList: templateProcess.taskLists[0]
}
Default.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}

export const Pending = Template.bind({})
Pending.args = {
  process: templateProcess,
  task: { ...templateProcess.taskLists[0].tasks[0], status: 'pending' },
  taskList: templateProcess.taskLists[0]
}
Pending.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}

export const Failed = Template.bind({})
Failed.args = {
  process: templateProcess,
  task: { ...templateProcess.taskLists[0].tasks[0], status: 'failed' },
  taskList: templateProcess.taskLists[0]
}
Failed.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}

export const Complete = Template.bind({})
Complete.args = {
  process: templateProcess,
  task: { ...templateProcess.taskLists[0].tasks[0], status: 'complete' },
  taskList: templateProcess.taskLists[0]
}
Complete.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}

export const WithDrawer = Template.bind({})
WithDrawer.args = {
  process: templateProcess,
  task: templateProcess.taskLists[0].tasks[0],
  taskList: templateProcess.taskLists[0]
}
WithDrawer.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}
WithDrawer.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  await userEvent.click(getByRole('button'))
}

export const UpdateSuccessful = Template.bind({})
UpdateSuccessful.args = {
  process: templateProcess,
  task: templateProcess.taskLists[0].tasks[0],
  taskList: templateProcess.taskLists[0]
}
UpdateSuccessful.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}
UpdateSuccessful.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  await userEvent.click(getByRole('button'))
  await userEvent.click(screen.getByRole('button', { name: 'Appointment Set' }))
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
}

export const UpdateFailed = Template.bind({})
UpdateFailed.args = {
  process: templateProcess,
  task: templateProcess.taskLists[0].tasks[0],
  taskList: templateProcess.taskLists[0]
}
UpdateFailed.parameters = {
  msw: {
    handlers: [updateProcessHandlerError()]
  }
}
UpdateFailed.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  await userEvent.click(getByRole('button'))
  await userEvent.click(screen.getByRole('button', { name: 'Appointment Set' }))
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
  // Snackbar hidden behind dialog, storybook only
  await userEvent.click(screen.getByRole('button', { name: 'close' }))
}

export default TaskItemStory as Meta
