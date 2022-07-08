import { Story, Meta } from '@storybook/react'

import { PersonDetailPage } from '.'

const PersonDetailPageStory = {
  title: 'Pages/PeoplePage/PersonDetailPage',
  component: PersonDetailPage
}

const Template: Story = () => <PersonDetailPage />

export const Default = Template.bind({})

export default PersonDetailPageStory as Meta
