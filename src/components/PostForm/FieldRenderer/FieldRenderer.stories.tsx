import { Divider, Stack, Typography } from '@mui/material'
import { Story, Meta } from '@storybook/react'

import { parameters } from '../../../../.storybook/preview'
import { PostField } from '../../../lib/queries/getDefinitions'
import { PostFieldDataValues } from '../../../lib/queries/getPost'

import { FieldRendererProps } from './FieldRenderer'

import { FieldRenderer } from '.'

const FieldRendererStory = {
  title: 'Components/FieldRenderer',
  component: FieldRenderer,
  argTypes: { onChange: { action: 'changed' }, onBlur: { action: 'blurred' } },
  parameters: { ...parameters, chromatic: { viewports: [410] } }
}

const Template: Story<
  Omit<FieldRendererProps, 'field' | 'values'> &
    Pick<PostField, 'minimum' | 'maximum'> & {
      showHelper?: boolean
      values?: { [key: string]: PostFieldDataValues }
    }
> = (args) => {
  const rendererProps = {
    values: args.values ?? {},
    errors: args.errors ?? {},
    touched: args.touched ?? {},
    onChange: args.onChange,
    onBlur: args.onBlur
  }

  const getFieldProps = ({
    title,
    placeholder,
    directive,
    type
  }: Pick<
    PostField,
    'title' | 'directive' | 'type' | 'placeholder'
  >): PostField => {
    return {
      title,
      directive,
      type,
      key:
        `${directive}${type.slice(0, 1).toUpperCase()}${type.slice(1)}` ??
        'key',
      description: args.showHelper
        ? `Create this using directive=${directive} type=${type}`
        : undefined,
      placeholder:
        args.minimum === args.maximum
          ? placeholder ?? `${title} placeholder`
          : undefined,
      minimum: args.minimum,
      maximum: args.maximum
    }
  }

  return (
    <Stack
      sx={{ m: 4, width: 345 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Stack sx={{ mb: 4 }} spacing={3}>
        <Typography variant="h5" gutterBottom>
          Form Components
        </Typography>
        <Typography variant="h6">Input</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Basic TextField',
              directive: 'input',
              type: 'string'
            })
          }}
        />
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Basic Checkbox',
              directive: 'input',
              type: 'boolean'
            })
          }}
        />
      </Stack>
      <Stack sx={{ my: 4, width: 350 }} spacing={3}>
        <Typography variant="h6">DateSelect</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Date',
              directive: 'date-select',
              type: 'date'
            })
          }}
        />
      </Stack>
      <Stack sx={{ my: 4, width: 350 }} spacing={3}>
        <Typography variant="h6">TimeSelect</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Time',
              directive: 'time-select',
              type: 'string'
            })
          }}
        />
      </Stack>
      <Stack sx={{ my: 4, width: 350 }} spacing={3}>
        <Typography variant="h6">TextArea</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Text Area',
              directive: 'textarea',
              type: 'string'
            })
          }}
        />
      </Stack>
    </Stack>
  )
}

export const Default = Template.bind({})
Default.args = {
  minimum: 0,
  maximum: 1
}

export const Filled = Template.bind({})
Filled.args = {
  ...Default.args,
  values: {
    inputString: 'Default Value',
    inputBoolean: true,
    textareaString: 'Default Value'
    // Date and Time pickers cannot hold default values due to their nature
  }
}

export const Required = Template.bind({})
Required.args = {
  minimum: 1,
  maximum: 1
}

export const HelperText = Template.bind({})
HelperText.args = {
  ...Default.args,
  showHelper: true
}

export const Error = Template.bind({})
Error.args = {
  ...Default.args,
  errors: {
    inputString: 'TextField Error',
    inputBoolean: 'Checkbox Error',
    textareaString: 'TextArea Error',
    'time-selectString': 'TimeSelect Error',
    'date-selectDate': 'DateSelect Error'
  },
  touched: {
    inputString: true,
    inputBoolean: true,
    textareaString: true,
    'time-selectString': true,
    'date-selectDate': true
  }
}

export default FieldRendererStory as Meta
