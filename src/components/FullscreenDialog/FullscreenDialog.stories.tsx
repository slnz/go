import { Button, Typography } from '@mui/material'
import { Story, Meta } from '@storybook/react'

import { FullscreenDialogProps } from './FullscreenDialog'

import { FullscreenDialog } from '.'

const FullscreenDialogStory = {
  title: 'Components/FullscreenDialog',
  component: FullscreenDialog,
  argTypes: { onClose: { action: 'closed' } }
}

const Template: Story<FullscreenDialogProps> = (args) => (
  <FullscreenDialog {...args} open={true}>
    <Typography variant="h6" sx={{ m: 4 }}>
      Fullscreen Dialog
    </Typography>
  </FullscreenDialog>
)

export const Default = Template.bind({})
Default.args = {}

export const Title = Template.bind({})
Title.args = {
  title: 'Form'
}

export const Action = Template.bind({})
Action.args = {
  action: (
    <Button autoFocus color="inherit">
      Done
    </Button>
  )
}

export default FullscreenDialogStory as Meta
