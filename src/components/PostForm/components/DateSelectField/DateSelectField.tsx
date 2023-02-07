import { TextField, TextFieldProps } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Dayjs } from 'dayjs'
import { useFormikContext } from 'formik'
import { ReactElement, useState } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function DateSelectField({
  field,
  error,
  helperText,
  required
}: PostFieldProps): ReactElement {
  const formikProps = useFormikContext()
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={field.title}
        value={value}
        disablePast
        inputFormat="DD/MM/YYYY"
        onChange={(date): void => {
          setValue(date)
          formikProps.setFieldValue('date', date)
        }}
        renderInput={(params: TextFieldProps): ReactElement => {
          return (
            <TextField
              {...params}
              name={field.key}
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
