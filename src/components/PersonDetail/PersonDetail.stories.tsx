import { Story, Meta } from '@storybook/react'

import {
  getContactHandler,
  getContactHandlerSimple
} from '../../lib/queries/getContact/getContact.handlers'

import { PersonDetail } from '.'

const PersonDetailStory = {
  title: 'Components/PersonDetail',
  component: PersonDetail
}

const Template: Story = () => (
  <div>
    <PersonDetail id="personId" />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getContactHandler()]
  }
}

export const Simple = Template.bind({})
Simple.parameters = {
  msw: {
    handlers: [getContactHandlerSimple()]
  }
}

export default PersonDetailStory as Meta
