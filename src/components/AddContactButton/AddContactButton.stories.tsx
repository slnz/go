import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { SnackbarProvider } from 'notistack'

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

export const Clicked = Template.bind({})
Clicked.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('button', { name: 'add' })
  await userEvent.click(element)
}

export const Error = Template.bind({})
Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const addButton = await getByRole('button', { name: 'add' })
  await userEvent.click(addButton)
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
}
export default AddContactButtonStory as Meta
