import { StoryFn, Meta } from '@storybook/react'

import { getContactsHandler } from '../../../lib/queries/getContacts/getContacts.handlers'
import { getProcessDefinitionsHandler } from '../../../lib/queries/getDefinitions/getDefinitions.handlers'
import { AuthProvider } from '../../../lib/useAuth'

import { PersonListPage } from '.'

const PersonListPageStory = {
  title: 'Pages/PeoplePage/PersonListPage',
  component: PersonListPage
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
    <PersonListPage />
  </AuthProvider>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getProcessDefinitionsHandler(), ...getContactsHandler()]
  }
}

export default PersonListPageStory as Meta
