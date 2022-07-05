import { Story, Meta } from '@storybook/react'
// import { within, userEvent } from '@storybook/testing-library'
import { Login } from './Login'

const LoginPage = {
  title: 'Go/Login',
  component: Login
}

const Template: Story = () => <Login />

export const LoggedOut = Template.bind({})

export const LoggedIn = Template.bind({})

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
//   const loginButton = await canvas.getByRole('button', { name: /Log in/i })
//   await userEvent.click(loginButton)
// }

export default LoginPage as Meta
