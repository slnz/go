import { Story, Meta } from '@storybook/react'

import {
  getContactHandler,
  getContactHandlerLoading,
  getContactHandlerSimple
} from '../../lib/queries/getContact/getContact.handlers'

import { PersonDetailProps } from './PersonDetail'

import { PersonDetail } from '.'

const PersonDetailStory = {
  title: 'Components/PersonDetail',
  component: PersonDetail
}

const Template: Story<PersonDetailProps> = (args) => (
  <div>
    <PersonDetail {...args} />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getContactHandler()]
  }
}
Default.args = {
  id: 'defaultId'
}

export const Simple = Template.bind({})
Simple.parameters = {
  msw: {
    handlers: [getContactHandlerSimple()]
  }
}
Simple.args = {
  id: 'simpleId'
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [getContactHandlerLoading()]
  }
}
Loading.args = {
  id: 'loadingId'
}

export default PersonDetailStory as Meta
