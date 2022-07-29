import { Story, Meta } from '@storybook/react'
import { userEvent, within, screen } from '@storybook/testing-library'
import { SnackbarProvider } from 'notistack'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'

import { AddContact } from './AddContact'

const AddContactStory = {
  title: 'Components/AddContact',
  component: AddContact
}
const Template: Story = () => (
  <SnackbarProvider>
    <AddContact />
  </SnackbarProvider>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [createContactHandler(), getRealmSelectableHandler()]
  }
}

export const Error = Template.bind({})
Error.parameters = {
  msw: {
    handlers: [createContactHandler()]
  }
}

Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'First Name' })
  await userEvent.type(element, 'test')
  await userEvent.click(getByRole('button', { name: 'Add Contact' }))
}
Error.args = {
  submitLabel: 'Add Contact'
}

export default AddContactStory as Meta