import { TextField } from '@mui/material'
import { ReactElement } from 'react'

import { PostFieldDataValues } from '../../../../lib/queries/getPost'
import type { PostFieldProps } from '../../FieldRenderer'

export function TextArea({
  field,
  value,
  error,
  helperText,
  required,
  onBlur,
  onChange
}: PostFieldProps): ReactElement {
  return (
    <TextField
      data-testid="text area"
      fullWidth
      required={required}
      name={field.key}
      label={field.title}
      placeholder={field.placeholder}
      value={(value as Omit<PostFieldDataValues, 'boolean'>) ?? ''}
      type={field.type === 'string' ? 'string' : field.type}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline
      rows={4}
      inputProps={{
        'data-testid': 'text area input'
      }}
    />
  )
}
