import { Story, Meta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import {
  getContactTimelineHandler,
  getContactTimelineHandlerLoading
} from '../../../lib/queries/getContactTimeline/getContactTimeline.handlers'

import { PersonDetailTimelineProps } from './Timeline'

import { PersonDetailTimeline } from '.'

const PersonDetailTimelineStory = {
  title: 'Components/PersonDetail/Timeline',
  component: PersonDetailTimeline
}

const Template: Story<PersonDetailTimelineProps> = (args) => (
  <div>
    <PersonDetailTimeline {...args} />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getContactTimelineHandler()]
  }
}
Default.args = {
  id: 'defaultId'
}

export const All = Template.bind({})
All.parameters = {
  msw: {
    handlers: [getContactTimelineHandler()]
  }
}
All.args = {
  id: 'allId'
}
All.play = async (): Promise<void> => {
  await userEvent.click(screen.getByRole('button', { name: 'Filter' }), {})
  await userEvent.click(screen.getByRole('option', { name: 'All' }))
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [getContactTimelineHandlerLoading()]
  }
}
Loading.args = {
  id: 'loadingId'
}

export default PersonDetailTimelineStory as Meta
