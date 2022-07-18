import { Story, Meta } from '@storybook/react'

import { getProcessHandler } from '../../lib/queries/getProcess/getProcess.handlers'

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
    handlers: [getProcessHandler()]
  }
}

export default ProcessDetailStory as Meta
