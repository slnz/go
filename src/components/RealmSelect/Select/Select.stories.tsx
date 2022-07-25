import { Story, Meta } from '@storybook/react'

import { RealmSelectSelectProps } from './Select'

import { RealmSelectSelect } from '.'

const RealmSelectSelectStory = {
  title: 'Components/RealmSelect/Select',
  component: RealmSelectSelect,
  argTypes: { onClick: { action: 'clicked' } }
}

const Template: Story<RealmSelectSelectProps> = (args) => (
  <RealmSelectSelect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: ['realmId1', 'realmId5', 'realmId8'],
  data: [
    {
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
    },
    {
      realms: [
        {
          _id: 'reamlId7',
          title: 'Realm 7',
          children: [{ _id: 'realmId8', title: 'Realm 8', children: [] }]
        }
      ]
    }
  ]
}

export default RealmSelectSelectStory as Meta
