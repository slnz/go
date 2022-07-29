import { Story, Meta } from '@storybook/react'

import { createContentHandler } from '../../lib/mutations/createContent/createContent.handlers'
import { getProcessDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'
import { getRealmSelectableHandler } from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { AuthProvider } from '../../lib/useAuth'

import { AddProcessButtonProps } from './AddProcessButton'

import { AddProcessButton } from '.'

const AddProcessButtonStory = {
  title: 'Components/AddProcessButton',
  component: AddProcessButton,
  argTypes: {
    onSubmit: { action: 'submitted' }
  }
}

const Template: Story<AddProcessButtonProps> = (args) => (
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
    <AddProcessButton {...args} />
  </AuthProvider>
)

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [
      getProcessDefinitionsHandler(),
      getRealmSelectableHandler(),
      createContentHandler()
    ]
  }
}
Default.args = {
  itemId: 'contactId',
  itemType: 'contact'
}

export default AddProcessButtonStory as Meta
