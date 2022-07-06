import { Story, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

import { LoginPage } from './LoginPage'

const LoginPageStory = {
  title: 'Pages/LoginPage',
  component: LoginPage
}

const Template: Story = () => <LoginPage />

export const Default = Template.bind({})
export const Error = Template.bind({})

Error.play = async ({ canvasElement }): Promise<void> => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'Email Address' })
  await userEvent.type(element, 'test')
  await userEvent.tab()
  await userEvent.tab()
}

export default LoginPageStory as Meta
