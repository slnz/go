import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { ReactElement } from 'react'

import { PostFieldDataValues } from '../../../../lib/queries/getPost'
import type { PostFieldProps } from '../../FieldRenderer'

export function SingleInputField({
  field,
  value,
  error,
  helperText,
  required,
  onBlur,
  onChange
}: PostFieldProps): ReactElement {
  // const model = {
  //   ...values
  // }
  console.log(value)
  return field.type === 'boolean' ? (
    <FormControl component="fieldset" required={required} error={error}>
      <FormControlLabel
        name={field.key}
        label={`${field.title}${required ? ' *' : ''}`}
        control={<Checkbox checked={value as boolean} />}
        onChange={onChange}
        onBlur={onBlur}
      />
      {helperText != null && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  ) : (
    <TextField
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
    />
  )
}
