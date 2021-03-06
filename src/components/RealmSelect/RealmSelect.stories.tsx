import { Box } from '@mui/material'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'

import {
  getRealmSelectableHandler,
  getRealmSelectableHandlerLoading
} from '../../lib/queries/getRealmSelectable/getRealmSelectable.handlers'

import { RealmSelectProps } from './RealmSelect'

import { RealmSelect } from '.'

const RealmSelectStory = {
  title: 'Components/RealmSelect',
  component: RealmSelect
}

const Template: Story<RealmSelectProps> = (args) => {
  const [value, setValue] = useState<string[]>(args.value ?? [])

  return (
    <Box m={2}>
      <RealmSelect
        {...{
          value,
          onChange: (value): void => {
            args.onChange?.(value)
            setValue(value)
          }
        }}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [getRealmSelectableHandler()]
  }
}

export const Selected = Template.bind({})
Selected.parameters = {
  msw: {
    handlers: [getRealmSelectableHandler()]
  }
}
Selected.args = {
  value: ['realmId1', 'realmId2']
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [getRealmSelectableHandlerLoading()]
  }
}

export default RealmSelectStory as Meta
