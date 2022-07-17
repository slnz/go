import { Story, Meta } from '@storybook/react'

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

export default ProcessDetailStory as Meta
