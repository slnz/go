import { Story, Meta } from '@storybook/react'

import {
  getContactHandler,
  getContactHandlerLoading,
  getContactHandlerSimple
} from '../../../lib/queries/getContact/getContact.handlers'

import { PersonDetailInfoProps } from './Info'

import { PersonDetailInfo } from '.'

const PersonDetailInfoStory = {
  title: 'Components/PersonDetail/Info',
  component: PersonDetailInfo
}

const Template: Story<PersonDetailInfoProps> = (args) => (
  <div>
    <PersonDetailInfo {...args} />
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

export default PersonDetailInfoStory as Meta
