import { Story, Meta } from '@storybook/react'

import { getPostDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'

import { PostFormProps } from './PostForm'

import { PostForm } from '.'

const PostFormStory = {
  title: 'Components/PostForm',
  component: PostForm
}

const Template: Story<PostFormProps> = (args) => <PostForm {...args} />

export const Default = Template.bind({})
Default.args = {
  personId: 'personId',
  definitionType: 'appointment'
}
Default.parameters = {
  msw: {
    handlers: [getPostDefinitionsHandler()]
  }
}

export default PostFormStory as Meta
