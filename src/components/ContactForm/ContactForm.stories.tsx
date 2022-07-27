import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { createContactHandler } from '../../lib/mutations/createContact.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'

import { ContactForm, ContactFormProps } from './ContactForm'

const AddContactStory = {
  title: 'Components/ContactForm',
  component: ContactForm,
  argTypes: { onSubmit: { action: 'submitted' } }
}
const Template: Story<ContactFormProps> = (args) => <ContactForm {...args} />

export const Default = Template.bind({})
Default.args = {
  submitLabel: 'Add Contact'
}
Default.parameters = {
  msw: {
    handlers: [createContactHandler(), getRealmSelectableHandler()]
  }
}
export const Prefilled = Template.bind({})
Prefilled.args = {
  contact: {
    firstName: 'test',
    lastName: 'test',
    gender: 'male',
    phone: '000000000000',
    email: 'email@example.com',
    realms: ['realmId1']
  }
}

export const Error = Template.bind({})

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
