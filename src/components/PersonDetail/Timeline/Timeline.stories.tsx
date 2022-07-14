import { Story, Meta } from '@storybook/react'

import {
  getContactHandler,
  getContactHandlerLoading,
  getContactHandlerSimple
} from '../../../lib/queries/getContact/getContact.handlers'

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
    handlers: [getContactHandler()]
  }
}
Default.args = {
  id: 'defaultId'
}

export const Simple = Template.bind({})
Simple.parameters = {
  msw: {
    handlers: [getContactHandlerSimple()]
  }
}
Simple.args = {
  id: 'simpleId'
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [getContactHandlerLoading()]
  }
}
Loading.args = {
  id: 'loadingId'
}

export default PersonDetailTimelineStory as Meta
