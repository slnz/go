import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { rest } from 'msw'

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
    handlers: [
      rest.post('https://api.fluro.io/content/contact', (req, res, ctx) => {
        return res(
          ctx.json({
            firstName: 'Neil',
            lastName: 'Maverick'
          })
        )
      })
    ]
  }
}
export const Prefilled = Template.bind({})
Prefilled.args = {
  contact: {
    firstName: 'test',
    lastName: 'test',
    gender: 'male',
    phone: '000000000000',
    email: 'email@example.com'
  }
}

export const Error = Template.bind({})

Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'First Name' })
  await userEvent.type(element, 'test')
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
}
Error.args = {
  submitLabel: 'Add Contact'
}

export default AddContactStory as Meta
