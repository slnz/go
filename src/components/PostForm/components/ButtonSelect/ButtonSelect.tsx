import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { ReactElement, useState } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function ButtonSelect({
  field,
  value,
  error,
  helperText,
  required,
  onChange
}: Omit<PostFieldProps, 'onBlur'>): ReactElement {
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const handleChecked = (key: number): void => {
    if (checkedItems.length <= field.maximum || checkedItems.includes(key)) {
      const newChecked = checkedItems.includes(key)
        ? checkedItems.filter((item) => item !== key)
        : [...checkedItems, key]
      setCheckedItems(newChecked)
    }
  }

  console.log(checkedItems)
  console.log(
    `directive: ${field.directive} minimum: ${field.minimum} maximum: ${field.maximum} required: ${required}`
  )
  console.log(`value: ${value}`)

  return field.maximum <= 1 ? (
    <FormControl required={required} error={error}>
      <FormLabel id="radio-buttons-group-label">{`${field.title}`}</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
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
              onClick={(): void => {
                handleChecked(index)
              }}
              name={field.key}
              value={option.value}
              disabled={
                checkedItems.length >= field.maximum &&
                !checkedItems.includes(index)
              }
            />
          }
          label={option.name}
        />
      ))}

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
