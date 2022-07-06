import { Story, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { ForgotPasswordPage } from './ForgotPasswordPage'

const ForgotPasswordPageStory = {
  title: 'Pages/ForgotPasswordPage',
  component: ForgotPasswordPage
}

const Template: Story = () => <ForgotPasswordPage />

export const Default = Template.bind({})
export const Error = Template.bind({})

Error.play = async ({ canvasElement }) => {
  const { getByRole } = within(canvasElement)
  const element = await getByRole('textbox', { name: 'Email Address' })
  await userEvent.type(element, 'test')
  await userEvent.tab()
}

export default ForgotPasswordPageStory as Meta
