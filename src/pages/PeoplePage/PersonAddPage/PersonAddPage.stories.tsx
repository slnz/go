import { Story, Meta } from '@storybook/react'

import { PersonAddPage } from '.'

const PersonAddPageStory = {
  title: 'Pages/PeoplePage/PersonAddPage',
  component: PersonAddPage
}

const Template: Story = () => <PersonAddPage />

export const Default = Template.bind({})

export default PersonAddPageStory as Meta
