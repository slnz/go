import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import { PersonRouterOutlet } from '.'

const PersonRouterOutletStory = {
  title: 'Components/PersonRouterOutlet',
  component: PersonRouterOutlet
}

const Template: Story = (args) => (
  <MemoryRouter initialEntries={args.initialEntries}>
    <PersonRouterOutlet />
  </MemoryRouter>
)

export const List = Template.bind({})
List.args = {
  initialEntries: ['/people']
}

export const Detail = Template.bind({})
Detail.args = {
  initialEntries: ['/people/personId']
}

export default PersonRouterOutletStory as Meta
