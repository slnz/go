import { Story, Meta } from '@storybook/react'
import { match } from 'react-router'

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

export default PersonDetailPageStory as Meta
