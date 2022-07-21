import { Story, Meta } from '@storybook/react'

import { updateProcessHandler } from '../../lib/mutations/updateProcess/updateProcess.handlers'
import {
  getProcessHandler,
  getProcessHandlerLoading
} from '../../lib/queries/getProcess/getProcess.handlers'

import { ProcessDetailProps } from './ProcessDetail'

import { ProcessDetail } from '.'

const ProcessDetailStory = {
  title: 'Components/ProcessDetail',
  component: ProcessDetail
}

const Template: Story<ProcessDetailProps> = (args) => (
  <ProcessDetail {...args} />
)

export const Default = Template.bind({})
Default.args = {
  id: 'defaultId'
}
Default.parameters = {
  msw: {
    handlers: [getProcessHandler(), updateProcessHandler()]
  }
}

export const Loading = Template.bind({})
Loading.args = {
  id: 'loadingId'
}
Loading.parameters = {
  msw: {
    handlers: [getProcessHandlerLoading()]
  }
}

export default ProcessDetailStory as Meta
