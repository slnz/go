import { Story, Meta } from '@storybook/react'

import { PersonListPage } from '.'

const PersonListPageStory = {
  title: 'Pages/PeoplePage/PersonListPage',
  component: PersonListPage
}

const Template: Story = () => <PersonListPage />

export const Default = Template.bind({})

export default PersonListPageStory as Meta
