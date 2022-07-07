import { Story, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

import { ForgotPassword } from './ForgotPassword'

const ForgotPasswordStory = {
  title: 'Components/ForgotPassword',
  component: ForgotPassword
}

const Template: Story = () => <ForgotPassword />

export const Default = Template.bind({})
export const Error = Template.bind({})

Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'Email Address' })
  await userEvent.type(element, 'test')
  await userEvent.tab()
}

export default ForgotPasswordStory as Meta
