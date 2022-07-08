import { Story, Meta } from '@storybook/react'

import { PeoplePage } from '.'

const PeoplePageStory = {
  title: 'Pages/PeoplePage',
  component: PeoplePage
}

const Template: Story = () => <PeoplePage />

export const Default = Template.bind({})

export default PeoplePageStory as Meta
