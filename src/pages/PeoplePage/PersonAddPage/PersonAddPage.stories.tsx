import { Story, Meta } from '@storybook/react'
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

export default PersonAddPageStory as Meta
