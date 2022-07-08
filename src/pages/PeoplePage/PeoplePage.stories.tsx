import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import { PeoplePage } from '.'

const PeoplePageStory = {
  title: 'Pages/PeoplePage',
  component: PeoplePage
}

const Template: Story = (args) => (
  <MemoryRouter initialEntries={args.initialEntries}>
    <PeoplePage />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  initialEntries: ['/people']
}

export const Detail = Template.bind({})
Detail.args = {
  initialEntries: ['/people/personId']
}

export default PeoplePageStory as Meta
