import { Story, Meta } from '@storybook/react'
import { match } from 'react-router'

import { getPostDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'

import { PostFormPage } from '.'

const PostFormPageStory = {
  title: 'Pages/PostFormPage',
  component: PostFormPage
}

const Template: Story = () => (
  <PostFormPage
    match={
      {
        params: { personId: 'personId', definitionType: 'appointment' }
      } as unknown as match<{
        personId: string
        definitionType: string
      }>
    }
  />
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getPostDefinitionsHandler()]
  }
}

export default PostFormPageStory as Meta
