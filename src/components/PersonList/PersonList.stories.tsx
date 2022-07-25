import { StoryFn, Meta } from '@storybook/react'
import { User } from 'fluro'

import {
  getContactsHandler,
  getContactsHandlerLoading
} from '../../lib/queries/getContacts/getContacts.handlers'
import { getProcessDefinitionsHandler } from '../../lib/queries/getProcessDefinitions/getProcessDefinitions.handlers'
import { AuthProvider } from '../../lib/useAuth'

import { PersonList } from '.'

const PersonListStory = {
  title: 'Components/PersonList',
  component: PersonList
}

export interface AuthContextType {
  user: User
}

const Template: StoryFn = () => (
  <AuthProvider
    initialUser={{
      _id: 'id',
      name: 'userName',
      email: 'myEmail@gmail.com',
      firstName: '',
      lastName: '',
      accountType: '',
      verified: true,
      account: {
        _id: '',
        title: '',
        color: ''
      },
      permissionSets: {},
      contacts: ['userId']
    }}
  >
    <PersonList search={''} />
  </AuthProvider>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getProcessDefinitionsHandler(), ...getContactsHandler()]
  }
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [getProcessDefinitionsHandler(), ...getContactsHandlerLoading()]
  }
}

export default PersonListStory as Meta
