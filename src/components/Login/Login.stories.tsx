import { Story, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

import { Login } from './Login'

const LoginStory = {
  title: 'Components/Login',
  component: Login
}

const Template: Story = () => <Login />

export const Default = Template.bind({})
export const Error = Template.bind({})

Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'Email Address' })
  await userEvent.type(element, 'test')
  await userEvent.tab()
  await userEvent.tab()
}

export default LoginStory as Meta
