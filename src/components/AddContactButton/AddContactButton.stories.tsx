import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { SnackbarProvider } from 'notistack'

import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'

import { AddContactButton } from '.'

const AddContactButtonStory = {
  title: 'Components/AddContactButton',
  component: AddContactButton
}

const Template: Story = () => (
  <SnackbarProvider>
    <AddContactButton />
  </SnackbarProvider>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getRealmSelectableHandler()]
  }
}

export const Clicked = Template.bind({})
Clicked.parameters = {
  msw: {
    handlers: [getRealmSelectableHandler()]
  }
}
Clicked.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('button', { name: 'add' })
  await userEvent.click(element)
}

export const Error = Template.bind({})
Error.parameters = {
  msw: {
    handlers: [getRealmSelectableHandler()]
  }
}
Error.args = {
  submitLabel: 'Add Contact'
}
Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const addButton = await getByRole('button', { name: 'add' })
  await userEvent.click(addButton)
}
export default AddContactButtonStory as Meta
