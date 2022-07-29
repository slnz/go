import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import {
  getContactHandler,
  getContactHandlerLoading,
  getContactHandlerSimple
} from '../../lib/queries/getContact/getContact.handlers'
import { getContactTimelineHandler } from '../../lib/queries/getContactTimeline/getContactTimeline.handlers'
import { getProcessDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'

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
    handlers: [
      getContactHandler(),
      getProcessDefinitionsHandler(),
      getContactTimelineHandler()
    ]
  }
}
DetailsTab.args = {
  id: 'defaultId'
}

export const TimelineTab = Template.bind({})
TimelineTab.parameters = {
  msw: {
    handlers: [
      getContactHandler(),
      getProcessDefinitionsHandler(),
      getContactTimelineHandler()
    ]
  }
}
TimelineTab.args = {
  id: 'timelineId'
}
TimelineTab.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  await userEvent.click(getByRole('tab', { name: 'Timeline' }))
  await userEvent.tab()
  await userEvent.tab()
}

export const Simple = Template.bind({})
Simple.parameters = {
  msw: {
    handlers: [
      getContactHandlerSimple(),
      getProcessDefinitionsHandler(),
      getContactTimelineHandler()
    ]
  }
}
Simple.args = {
  id: 'simpleId'
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [
      getContactHandlerLoading(),
      getProcessDefinitionsHandler(),
      getContactTimelineHandler()
    ]
  }
}
Loading.args = {
  id: 'loadingId'
}

export default PersonDetailStory as Meta
