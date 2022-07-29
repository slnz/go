import { FormControlLabel, FormGroup, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { ReactElement } from 'react'

import { PostFieldProps } from '../../PostForm'

export function SingleInputField({
  field,
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}: PostFieldProps): ReactElement {
  const model = {
    ...values
  }

  // console.log('model', model, values)
  return field.type === 'boolean' ? (
    <FormGroup>
      <FormControlLabel
        name={field.key}
        label={field.title}
        control={<Checkbox defaultChecked={false} />}
        value={values[field.key]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </FormGroup>
  ) : (
    <TextField
      fullWidth
      name={field.key}
      label={field.title}
      value={values[field.key]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched[field.key] && Boolean(errors[field.key])}
      helperText={touched[field.key] && errors[field.key]}
    />
  )
}
