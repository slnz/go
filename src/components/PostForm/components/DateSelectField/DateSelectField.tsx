import { TextField, TextFieldProps } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import { ReactElement, useState } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function DateSelectField({
  field,
  value,
  error,
  helperText,
  required,
  onBlur,
  onChange
}: PostFieldProps): ReactElement {
  const [date, setDate] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={field.title}
        value={date}
        disablePast
        inputFormat="DD/MM/YYYY"
        onChange={(newDate): void => {
          setDate(newDate)
        }}
        renderInput={(params: TextFieldProps): ReactElement => {
          return (
            <TextField
              {...params}
              onBlur={onBlur}
              onChange={onChange}
              required={required}
              helperText={helperText}
              error={error}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}
