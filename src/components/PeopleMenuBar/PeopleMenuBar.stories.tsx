import { Story, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

import { PeopleMenuBar } from './PeopleMenuBar'

const PeopleMenuBarStory: Meta = {
  title: 'Components/PeopleMenuBar',
  component: PeopleMenuBar,
  argTypes: { onChange: { action: 'changed' } }
}

const Template: Story = (args) => {
  return <PeopleMenuBar {...args} />
}

export const Default = Template.bind({})

export const Search = Template.bind({})
Search.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'Search' })
  await userEvent.type(element, 'test')
}

export const Menu = Template.bind({})
Menu.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('button', { name: 'Menu' })
  await userEvent.click(element)
}

export default PeopleMenuBarStory as Meta
