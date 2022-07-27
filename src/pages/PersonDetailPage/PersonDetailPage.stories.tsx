import { Story, Meta } from '@storybook/react'
import { match } from 'react-router'

import { getContactHandler } from '../../lib/queries/getContact/getContact.handlers'
import { getContactTimelineHandler } from '../../lib/queries/getContactTimeline/getContactTimeline.handlers'
import { getProcessDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'

import { PersonDetailPage } from '.'

const PersonDetailPageStory = {
  title: 'Pages/PersonDetailPage',
  component: PersonDetailPage
}

const Template: Story = () => (
  <PersonDetailPage
    match={
      { params: { personId: 'personId' } } as unknown as match<{
        personId: string
      }>
    }
  />
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [
      getContactHandler(),
      getProcessDefinitionsHandler(),
      getContactTimelineHandler()
    ]
  }
}

export default PersonDetailPageStory as Meta
