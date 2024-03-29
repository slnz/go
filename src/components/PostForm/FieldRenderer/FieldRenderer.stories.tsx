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

  const selectOptions = [
    {
      name: 'Option One',
      value: 'Value One'
    },
    {
      name: 'Option Two',
      value: 'Value Two'
    },
    {
      name: 'Option Three',
      value: 'Value Three'
    },
    {
      name: 'Option Four',
      value: 'Value Four'
    }
  ]

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
        <Typography variant="h6">Select</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Select',
              directive: 'select',
              type: 'string'
            }),
            options: selectOptions
          }}
        />
      </Stack>
      <Stack sx={{ my: 4, width: 350 }} spacing={3}>
        <Typography variant="h6">Multiple Select</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Multiple Select',
              directive: 'select',
              type: 'string'
            }),
            options: selectOptions,
            maximum: 4
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
      <Stack sx={{ my: 4, width: 350 }} spacing={3}>
        <Typography variant="h6">Button Select</Typography>
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Multi Button Select',
              directive: 'button-select',
              type: 'string'
            }),
            options: [
              { name: 'Approach', value: 'Approach' },
              { name: 'Pre-Gospel', value: 'Pre-Gospel' },
              { name: 'Gospel', value: 'Gospel' }
            ],
            maximum: 2
          }}
        />
        <FieldRenderer
          {...rendererProps}
          field={{
            ...getFieldProps({
              title: 'Single Button Select',
              directive: 'button-select',
              type: 'string'
            }),
            options: [
              { name: 'Approach', value: 'Approach' },
              { name: 'Pre-Gospel', value: 'Pre-Gospel' },
              { name: 'Gospel', value: 'Gospel' }
            ]
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
  minimum: 1
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
    selectString: 'Select Error',
    'time-selectString': 'TimeSelect Error',
    'date-selectDate': 'DateSelect Error',
    'button-selectString': 'ButtonSelect Error'
  },
  touched: {
    inputString: true,
    inputBoolean: true,
    textareaString: true,
    selectString: true,
    'date-selectDate': true,
    'time-selectString': true,
    'button-selectString': true
  }
}
export default FieldRendererStory as Meta
