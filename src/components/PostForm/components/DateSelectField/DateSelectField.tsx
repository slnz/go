import { TextField, TextFieldProps } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { ReactElement, useCallback, useState } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function DateSelectField({
  field,
  error,
  helperText,
  required
}: PostFieldProps): ReactElement {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={field.title}
        value={value}
        disablePast
        inputFormat="DD/MM/YYYY"
        onChange={(date): void => {
          setValue(date)
          console.log(dayjs(date).format('YYYY-MM-DD'))
        }}
        renderInput={(params: TextFieldProps): ReactElement => {
          return (
            <TextField
              {...params}
              required={required}
              helperText={helperText}
              error={error}
              inputProps={{
                ...params.inputProps,
                readOnly: true
              }}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}
