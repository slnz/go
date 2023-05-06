import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material'
import { useFormikContext } from 'formik'
import { ReactElement, useState } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function SelectField({
  field,
  error,
  helperText,
  required
}: PostFieldProps): ReactElement {
  const formikProps = useFormikContext()
  const [option, setOption] = useState('')
  const [options, setOptions] = useState<string[]>([])

  return field.maximum <= 1 ? (
    <FormControl fullWidth error={error} required={required}>
      <InputLabel>{field.title}</InputLabel>
      <Select
        value={option}
        label={field.title}
        onChange={(event): void => {
          setOption(event.target.value)
          if (formikProps != null) {
            formikProps.setFieldValue(field.key, event.target.value)
          }
        }}
      >
        {field.options?.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  ) : (
    <FormControl fullWidth error={error} required={required}>
      <InputLabel>{field.title}</InputLabel>
      <Select
        value={options}
        multiple
        label={field.title}
        onChange={(event): void => {
          setOptions(event.target.value as string[])
        }}
        renderValue={(selected: string[]): ReactElement => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        onClose={(): void => {
          if (formikProps != null) {
            formikProps.setFieldValue(field.key, options)
          }
        }}
      >
        {field.options?.map((option) => (
          <MenuItem
            key={option.name}
            value={option.value}
            disabled={
              options.length >= field.maximum && !options.includes(option.value)
            }
          >
            <Checkbox checked={options.includes(option.value)} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
