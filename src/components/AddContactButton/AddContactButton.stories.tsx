import { Story, Meta } from '@storybook/react'

import { AddContactButton } from '.'

const AddContactButtonStory = {
  title: 'Components/AddContactButton',
  component: AddContactButton
}

const Template: Story = () => <AddContactButton />

export const Default = Template.bind({})

export default AddContactButtonStory as Meta
