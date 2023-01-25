import { TextField } from '@mui/material'
import { ReactElement } from 'react'

import { PostFieldDataValues } from '../../../../lib/queries/getPost'
import { PostFieldProps } from '../../FieldRenderer'

export function DateSelectField({
  field,
  value,
  error,
  helperText,
  required,
  onBlur,
  onChange
}: PostFieldProps): ReactElement {
  console.log(field)
  return (
    <TextField
      data-testid="date select"
      fullWidth
      required={required}
      name={field.key}
      label={field.title}
      value={(value as Omit<PostFieldDataValues, 'boolean'>) ?? ''}
      type={field.type === 'string' ? 'string' : field.type}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputLabelProps={{ shrink: true }}
    />
  )
}
