import { Story, Meta } from '@storybook/react'

import { AddContact } from '.'

const AddContactStory = {
  title: 'Components/AddContact',
  component: AddContact
}

const Template: Story = () => <AddContact />

export const Default = Template.bind({})
export const Error = Template.bind({})

// Error.play = async ({ canvasElement }): Promise<void> => {}

export default AddContactStory as Meta
