import { Story, Meta } from '@storybook/react'

import { ContactFormProps } from './ContactForm'

import { ContactForm } from '.'

const AddContactStory = {
  title: 'Components/ContactForm',
  component: ContactForm,
  argTypes: { onSubmit: { action: 'submitted' } }
}

const Template: Story<ContactFormProps> = (args) => <ContactForm {...args} />

export const Default = Template.bind({})
export const Error = Template.bind({})

// Error.play = async ({ canvasElement }): Promise<void> => {}

export default AddContactStory as Meta
