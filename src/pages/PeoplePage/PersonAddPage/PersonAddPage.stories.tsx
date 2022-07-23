import { Story, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { SnackbarProvider } from 'notistack'

import { PersonAddPage } from '.'

const PersonAddPageStory = {
  title: 'Pages/PeoplePage/PersonAddPage',
  component: PersonAddPage
}

const Template: Story = () => (
  <SnackbarProvider>
    <PersonAddPage />
  </SnackbarProvider>
)

export const Default = Template.bind({})

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
}

export default PersonAddPageStory as Meta
