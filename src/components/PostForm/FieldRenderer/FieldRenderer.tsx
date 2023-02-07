import { Typography } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { ReactElement, SyntheticEvent } from 'react'

import { PostField } from '../../../lib/queries/getDefinitions'
import {
  PostFieldData,
  PostFieldDataValues
} from '../../../lib/queries/getPost'
import { SingleInputField } from '../components/SingleInputField'
import { TextArea } from '../components/TextArea'
import { TimeSelectField } from '../components/TimeSelectField'

export interface PostFieldProps {
  field: PostField
  value: PostFieldDataValues
  error?: boolean
  helperText?: string
  required?: boolean
  onChange: (event: SyntheticEvent) => void
  onBlur: (event: SyntheticEvent) => void
}

export interface FieldRendererProps {
  field: PostField
  values: PostFieldData
  errors: FormikErrors<PostFieldData>
  touched: FormikTouched<PostFieldData>
  onChange: (event: SyntheticEvent) => void
  onBlur: (event: SyntheticEvent) => void
}

export function FieldRenderer({
  field,
  values,
  errors,
  touched,
  onBlur,
  onChange
}: FieldRendererProps): ReactElement {
  const fieldProps: PostFieldProps = {
    field,
    value: values[field.key],
    error: touched[field.key] && Boolean(errors[field.key]),
    helperText:
      touched[field.key] && errors[field.key]
        ? errors[field.key]
        : field.description,
    required: field.minimum === field.maximum && field.maximum > 0,
    onChange,
    onBlur
  }

  switch (field.directive) {
    case 'input':
      return <SingleInputField {...fieldProps} />
    case 'textarea':
      return <TextArea {...fieldProps} />
    case 'time-select':
      return <TimeSelectField {...fieldProps} />
    default:
      return (
        <Typography>
          {field.title} {field.directive}
        </Typography>
      )
  }
}
