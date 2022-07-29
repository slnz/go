import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { SnackbarProvider } from 'notistack'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
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
    handlers: [createContactHandler(), getRealmSelectableHandler()]
  }
}

export const Clicked = Template.bind({})
Clicked.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('button', { name: 'add' })
  await userEvent.click(element)
}

export const Error = Template.bind({})
Error.parameters = {
  msw: {
    handlers: [createContactHandler()]
  }
}
Error.args = {
  submitLabel: 'Add Contact'
}
Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const addButton = await getByRole('button', { name: 'add' })
  await userEvent.click(addButton)
  const element = await getByRole('textbox', { name: 'First Name' })
  await userEvent.type(element, 'test')
  await userEvent.click(getByRole('button', { name: 'Add Contact' }))
}
export default AddContactButtonStory as Meta
