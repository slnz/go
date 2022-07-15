import { Story, Meta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import {
  getContactHandler,
  getContactHandlerLoading,
  getContactHandlerSimple
} from '../../lib/queries/getContact/getContact.handlers'
import { getContactTimelineHandler } from '../../lib/queries/getContactTimeline/getContactTimeline.handlers'

import { PersonDetailProps } from './PersonDetail'

import { PersonDetail } from '.'

const PersonDetailStory = {
  title: 'Components/PersonDetail',
  component: PersonDetail
}

const Template: Story<PersonDetailProps> = (args) => (
  <div>
    <PersonDetail {...args} />
  </div>
)

export const DetailsTab = Template.bind({})
DetailsTab.parameters = {
  msw: {
    handlers: [getContactHandler(), getContactTimelineHandler()]
  }
}
DetailsTab.args = {
  id: 'defaultId'
}

export const TimelineTab = Template.bind({})
TimelineTab.parameters = {
  msw: {
    handlers: [getContactHandler(), getContactTimelineHandler()]
  }
}
TimelineTab.args = {
  id: 'timelineId'
}
TimelineTab.play = async (): Promise<void> => {
  await userEvent.click(screen.getByRole('tab', { name: 'Timeline' }))
  await userEvent.click(screen.getByRole('heading', { name: 'Robert' }))
}

export const Simple = Template.bind({})
Simple.parameters = {
  msw: {
    handlers: [getContactHandlerSimple(), getContactTimelineHandler()]
  }
}
Simple.args = {
  id: 'simpleId'
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [getContactHandlerLoading(), getContactTimelineHandler()]
  }
}
Loading.args = {
  id: 'loadingId'
}

export default PersonDetailStory as Meta
