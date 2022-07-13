import { Story, Meta } from '@storybook/react'
import { match } from 'react-router'

import { getContactHandler } from '../../../lib/queries/getContact/getContact.handlers'

import { PersonDetailPage } from '.'

const PersonDetailPageStory = {
  title: 'Pages/PeoplePage/PersonDetailPage',
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
    handlers: [getContactHandler]
  }
}

export default PersonDetailPageStory as Meta
