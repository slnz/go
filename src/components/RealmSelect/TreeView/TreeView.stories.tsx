import { Story, Meta } from '@storybook/react'

import { RealmSelectTreeViewProps } from './TreeView'

import { RealmSelectTreeView } from '.'

const RealmSelectSelectStory = {
  title: 'Components/RealmSelect/TreeView',
  component: RealmSelectTreeView,
  argTypes: { onNodeSelect: { action: 'nodeSelected' } }
}

const Template: Story<RealmSelectTreeViewProps> = (args) => (
  <RealmSelectTreeView {...args} />
)

export const Default = Template.bind({})
Default.args = {
  selected: ['realmId1', 'realmId5', 'realmId8'],
  realms: [
    {
      _id: 'realmId1',
      title: 'Realm 1',
      children: [
        { _id: 'realmId2', title: 'Realm 2', children: [] },
        { _id: 'realmId3', title: 'Realm 3', children: [] }
      ]
    },
    {
      _id: 'reamlId4',
      title: 'Realm 4',
      children: [
        { _id: 'realmId5', title: 'Realm 5', children: [] },
        { _id: 'realmId6', title: 'Realm 6', children: [] }
      ]
    }
  ]
}

export default RealmSelectSelectStory as Meta
