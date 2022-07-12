import { Story, Meta } from '@storybook/react'

import { ContactForm } from '.'

const AddContactStory = {
  title: 'Components/ContactForm',
  component: ContactForm
}

const Template: Story = () => <ContactForm />

export const Default = Template.bind({})
export const Error = Template.bind({})

// Error.play = async ({ canvasElement }): Promise<void> => {}

export default AddContactStory as Meta
