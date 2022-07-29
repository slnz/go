import { Story, Meta } from '@storybook/react'

import { updateProcessHandler } from '../../../lib/mutations/updateProcess/updateProcess.handlers'

import { TaskItemDrawerProps } from './Drawer'

import { TaskItemDrawer } from '.'

const TaskItemStory = {
  title: 'Components/TaskItem/Drawer',
  component: TaskItemDrawer,
  argTypes: { onChange: { action: 'changed' } }
}

const Template: Story<TaskItemDrawerProps> = (args) => (
  <TaskItemDrawer {...args} />
)

const templateProcess: TaskItemDrawerProps['process'] = {
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
  taskList: templateProcess.taskLists[0],
  open: true
}
Default.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}

export const Selected = Template.bind({})
Selected.args = {
  process: templateProcess,
  task: { ...templateProcess.taskLists[0].tasks[0], status: 'pending' },
  taskList: templateProcess.taskLists[0],
  open: true
}
Selected.parameters = {
  msw: {
    handlers: [updateProcessHandler()]
  }
}

export default TaskItemStory as Meta
