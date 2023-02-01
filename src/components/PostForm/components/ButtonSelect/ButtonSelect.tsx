import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { ReactElement } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function ButtonSelect({
  field,
  value,
  error,
  helperText,
  required,
  onBlur,
  onChange
}: PostFieldProps): ReactElement {
  console.log('buttonselectrequired', required)
  console.log('values', value)
  return field.maximum <= 1 ? (
    <FormControl required={required} error={error}>
      <FormLabel id="demo-radio-buttons-group-label">{`${field.title}`}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={onChange}
      >
        {field.options?.map((option, index) => (
          <FormControlLabel
            name={field.key}
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.name}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  ) : (
    <FormControl
      required={required}
      error={error}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard"
    >
      <FormLabel component="legend">{`${field.title}`}</FormLabel>
      {field.options?.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              onChange={onChange}
              name={field.key}
              value={option.value}
            />
          }
          label={option.name}
        />
      ))}

      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}
