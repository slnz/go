import { Story, Meta } from '@storybook/react'

import { createContentHandler } from '../../../lib/mutations/createContent/createContent.handlers'
import {
  getProcessDefinitionsHandler,
  getDefinitionsHandlerLoading
} from '../../../lib/queries/getDefinitions/getDefinitions.handlers'
import {
  getRealmSelectableHandler,
  getRealmSelectableHandlerLoading
} from '../../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'
import { AuthProvider } from '../../../lib/useAuth'

import { AddProcessButtonDialogProps } from './Dialog'

import { AddProcessButtonDialog } from '.'

const AddProcessButtonDialogStory = {
  title: 'Components/AddProcessButton/Dialog',
  component: AddProcessButtonDialog,
  argTypes: {
    onSubmit: { action: 'submitted' },
    onClose: { action: 'closed' }
  }
}

const Template: Story<AddProcessButtonDialogProps> = (args) => (
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
    <AddProcessButtonDialog {...args} />
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
  open: true,
  itemId: 'contactId',
  itemType: 'contact'
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [
      getDefinitionsHandlerLoading(),
      getRealmSelectableHandlerLoading(),
      createContentHandler()
    ]
  }
}
Loading.args = {
  open: true,
  itemId: 'contactId',
  itemType: 'contact'
}

export default AddProcessButtonDialogStory as Meta
